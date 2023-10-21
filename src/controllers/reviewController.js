const Review = require("../models/UserReview");
const User = require("../models/User");
const Job = require("../models/Job");

async function getUserReviews(req, res) {
  try {
    const userId = req.params.userId;

    // Query the database to fetch reviews for the specified user
    const userReviews = await Review.findAll({
      where: { reviewerUserId: userId },
      include: [
        {
          model: User,
          as: "reviewer",
          attributes: ["id", "username"],
        },
        {
          model: Job,
          attributes: ["id", "title"], // Include the job details you want to retrieve
          include: [
            {
              model: User, // No alias is needed here
              attributes: ["id", "username"],
            },
          ],
        },
      ],
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
