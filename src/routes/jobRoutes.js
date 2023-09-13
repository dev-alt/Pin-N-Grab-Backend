const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Create a new job
router.post('/create', jobController.createJob);
router.post('/delete:id', jobController.deleteJobById);
router.post('/update:id', jobController.updateJobById);
router.get('/get:id', jobController.getJobById);

module.exports = router;