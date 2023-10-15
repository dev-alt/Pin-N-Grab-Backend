const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Route to fetch reviews for a specific user by user ID
router.get('/user/:userId', reviewController.getUserReviews);

module.exports = router;
