const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");

/**
 * @swagger
 * /api/reviews/user/{userId}:
 *   get:
 *     summary: Get reviews for a specific user by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user whose reviews you want to fetch.
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: A list of reviews for the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 *       404:
 *         description: No reviews found for the user.
 *         content:
 *           application/json:
 *             example:
 *               error: No reviews found for this user
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
router.get("/user/:userId", reviewController.getUserReviews);


module.exports = router;
