const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const emailController = require('../controllers/emailController');

/**
 * @swagger
 * /api/email/send:
 *   post:
 *     summary: Send an email
 *     description: Send an email from one user to another.
 *     tags: [Email]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senderUserId:
 *                 type: integer
 *               recipientUserId:
 *                 type: integer
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Email sent successfully.
 *       500:
 *         description: Internal server error.
 */
router.post('/send', authMiddleware.authenticateJWT, emailController.sendEmail);

/**
 * @swagger
 * /api/email/inbox:
 *   get:
 *     summary: Retrieve a user's inbox
 *     description: Retrieve a user's inbox (received email).
 *     tags: [Email]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User's inbox retrieved successfully.
 *       500:
 *         description: Internal server error.
 */
router.get('/inbox', authMiddleware.authenticateJWT, emailController.getInbox);

/**
 * @swagger
 * /api/email/{id}:
 *   get:
 *     summary: View email by ID
 *     description: View an email by its ID.
 *     tags: [Email]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the email to view.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Email viewed successfully.
 *       404:
 *         description: Email not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', authMiddleware.authenticateJWT, emailController.viewEmail);

/**
 * @swagger
 * /api/email/{id}/star:
 *   put:
 *     summary: Star an email
 *     description: Star an email by its ID.
 *     tags: [Email]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the email to star.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Email starred successfully.
 *       404:
 *         description: Email not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/:id/star', authMiddleware.authenticateJWT, emailController.starEmail);

/**
 * @swagger
 * /api/email/{id}:
 *   delete:
 *     summary: Delete an email
 *     description: Delete an email by its ID.
 *     tags: [Email]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the email to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Email deleted successfully.
 *       404:
 *         description: Email not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', authMiddleware.authenticateJWT, emailController.deleteEmail);

module.exports = router;
