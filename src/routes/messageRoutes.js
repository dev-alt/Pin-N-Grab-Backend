const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const messageController = require("../controllers/messageController");

/**
 * @swagger
 * /api/Message/send:
 *   post:
 *     summary: Send an Message
 *     description: Send an Message from one user to another.
 *     tags: [Message]
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
 *         description: Message sent successfully.
 *       500:
 *         description: Internal server error.
 */
router.post("/send", authMiddleware.authenticateJWT, messageController.sendMessage);

/**
 * @swagger
 * /api/Message/inbox:
 *   get:
 *     summary: Retrieve a user's inbox
 *     description: Retrieve a user's inbox (received Messages).
 *     tags: [Message]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID of the inbox owner.
 *     responses:
 *       200:
 *         description: User's inbox retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'  # Reference to your Message schema
 *       500:
 *         description: Internal server error.
 */
router.get("/get/inbox/:id", authMiddleware.authenticateJWT, messageController.getInbox);

/**
 * @swagger
 * /api/Message/{id}:
 *   get:
 *     summary: View Message by ID
 *     description: View an Message by its ID.
 *     tags: [Message]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Message to view.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Message viewed successfully.
 *       404:
 *         description: Message not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", authMiddleware.authenticateJWT, messageController.viewMessage);

/**
 * @swagger
 * /api/Message/{id}:
 *   delete:
 *     summary: Delete an Message
 *     description: Delete an Message by its ID.
 *     tags: [Message]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Message to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Message deleted successfully.
 *       404:
 *         description: Message not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  "/:id",
  authMiddleware.authenticateJWT,
  messageController.deleteMessage
);

module.exports = router;
