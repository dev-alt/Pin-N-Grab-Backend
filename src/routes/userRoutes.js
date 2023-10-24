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
 * /api/users/{userId}/saveJob/{jobId}:
 *   post:
 *     summary: Save a job by a user.
 *     tags: [SaveJob]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user.
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the job to save.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       201:
 *         description: Job saved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message confirming the job was saved successfully.
 *       400:
 *         description: Job already saved.
 *         content:
 *           application/json:
 *             example:
 *               error: Job already saved
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error, cannot save job
 */
router.post("/:userId/saveJob/:jobId", authMiddleware.authenticateJWT, saveJobController.saveJob);


/**
 * @swagger
 * /api/users/{userId}/unsaveJob/{jobId}:
 *   delete:
 *     summary: Unsave a job by a user.
 *     tags: [SaveJob]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user.
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the job to unsave.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Job unsaved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message confirming the job was unsaved successfully.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error, cannot unsave job
 */
router.delete("/:userId/unsaveJob/:jobId", authMiddleware.authenticateJWT, saveJobController.unsaveJob);

/**
 * @swagger
 * /api/users/{userId}/checkSavedJob/{jobId}:
 *   get:
 *     summary: Check if a job is saved by a user.
 *     tags: [SaveJob]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user.
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the job to check.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Indicates whether the job is saved by the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSaved:
 *                   type: boolean
 *                   description: A boolean indicating if the job is saved by the user.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error, cannot check saved status
 */
router.get("/:userId/checkSavedJob/:jobId", authMiddleware.authenticateJWT, saveJobController.checkSavedStatus);

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
router.put(
  "/:id/profile",
  authMiddleware.authenticateJWT,
  userController.updateUserProfile
);

// Export the router
module.exports = router;
