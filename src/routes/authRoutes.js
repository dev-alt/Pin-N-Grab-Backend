const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const bcrypt = require('bcrypt');
const authMiddleware = require('../middlewares/authMiddleware');
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config'); // Import the secretKey variable
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user account.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request, invalid input data.
 *       500:
 *         description: Internal server error.
 */
router.post('/register', authController.registerUser);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get user profile
 *     description: Get the profile information of the authenticated user.
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Unauthorized. User is not authenticated.
 *       403:
 *         description: Forbidden. User does not have permission to access this resource.
 *       500:
 *         description: Internal server error.
 */
router.get('/profile', authMiddleware.authenticateJWT, (req, res) => {
    console.log('Request user:', req.user);
    const { username, email } = req.user;
    res.json({ username, email });
  });

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and return a JWT token upon successful login.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully. Returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Authentication failed. Invalid username or password.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(req.body); // Log the request body to check the received data
      // Find the user by username
      const user = await User.findOne({ where: { username } });
  
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
  
      // Check if the provided password matches the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // If authentication is successful, generate and send the JWT
      const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
        expiresIn: '1h',
      });
  console.log(token);
      res.json({ token });
  
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
