const Review = require("../models/UserReview");
const User = require("../models/User");

async function getUserReviews(req, res) {
  try {
    const userId = req.params.userId;

    // Query the database to fetch reviews for the specified user
    const userReviews = await Review.findAll({
      where: { reviewerUserId: userId },
      include: [{ model: User, as: "reviewer", attributes: ["username"] }],
    });

    if (!userReviews) {
      return res.status(404).json({ error: "No reviews found for this user" });
    }

    res.json(userReviews);
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { getUserReviews };
