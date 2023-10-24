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
router.post(
  "/send",
  authMiddleware.authenticateJWT,
  messageController.sendMessage
);

/**
 * @swagger
 * /get/inbox/{id}/unread:
 *   get:
 *     summary: Get unread messages for a specific user.
 *     tags:
 *       - Message
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID to retrieve unread messages for.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of unread messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       404:
 *         description: User not found or no unread messages
 *       500:
 *         description: Internal server error
 */
router.get("/get/inbox/:id/unread", authMiddleware.authenticateJWT, messageController.getUnreadMessages);

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
router.get(
  "/get/inbox/:id",
  authMiddleware.authenticateJWT,
  messageController.getInbox
);

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
router.get(
  "/:id",
  authMiddleware.authenticateJWT,
  messageController.viewMessage
);

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

/**
 * @swagger
 * /api/message/mark-as-read/{id}:
 *   patch:
 *     summary: Mark a Message as Read
 *     description: Mark a message as read by its ID.
 *     tags: [Message]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the message to mark as read.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Message marked as read.
 *       403:
 *         description: Access denied.
 *       404:
 *         description: Message not found.
 *       500:
 *         description: Internal server error.
 */
router.patch(
  "/mark-as-read/:id",
  authMiddleware.authenticateJWT, // Use your authentication middleware
  messageController.markAsRead
);

module.exports = router;
