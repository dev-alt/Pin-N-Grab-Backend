const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const db = require("../utils/db");
const authMiddleware = require("../middlewares/authMiddleware");
const saveJobController = require("../controllers/saveJobController");

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get a list of users
 *     description: Retrieve a list of all users.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users.
 *       500:
 *         description: Internal server error.
 */
router.get("/all", userController.getAllUsers);

/**
 * @swagger
 * /api/users/test-route:
 *   get:
 *     summary: Test route
 *     description: A test route.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A success message.
 */
router.get("/test-route", (req, res) => {
  res.json({ message: "This is a test route" });
});

router.post("/:userId/saveJob/:jobId", saveJobController.saveJob);

router.delete("/:userId/unsaveJob/:jobId", saveJobController.unsaveJob);

/**
 * @swagger
 * /api/users/data:
 *   get:
 *     summary: Get user data
 *     description: Retrieve data from the "Users" table.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: User data retrieved successfully.
 *       500:
 *         description: Internal server error.
 */

router.get("/data", async (req, res) => {
  try {
    const query = "SELECT * FROM Users";
    const [rows] = await db.query(query);
    console.log("Rows:", rows);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data from the database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/users/{id}/profile:
 *   get:
 *     summary: Get user profile by ID
 *     description: Retrieve user profile information by ID.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User profile retrieved successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

router.get("/:id/profile", userController.getUserProfile);

/**
 * @swagger
 * /api/users/{id}/profile:
 *   put:
 *     summary: Update user profile by ID
 *     description: Update user profile information by ID.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/models/UserProfile'
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *       400:
 *         description: Invalid request data.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */
router.put("/:id/profile", userController.updateUserProfile);

// Export the router
module.exports = router;
