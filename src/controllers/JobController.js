const Job = require('../models/Job');


/**
 * Creates a new job listing.
 * @async
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function createJob(req, res) {
    try {
        const {
            title,
            description,
            location,
            deadline,
            paymentType,
            skillLevel,
            experienceRequired,
            jobStatus,
            category_id,
        } = req.body;

        const job = await Job.create({
            title,
            description,
            location,
            deadline,
            paymentType,
            skillLevel,
            experienceRequired,
            jobStatus,
            category_id,
        });

        res.status(201).json({ message: 'Job listing created', job });
    } catch (error) {
        console.error('Error creating job listing:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Retrieves a job listing by its ID.
 * @async
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function getJobById(req, res) {
    try {
        const jobId = req.params.id;
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.json(job);
    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Updates a job listing by its ID.
 * @async
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function updateJobById(req, res) {
    try {
        const jobId = req.params.id;
        const updatedJob = req.body; // Ensure you validate and sanitize the data
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        // Update job properties based on updatedJob
        job.title = updatedJob.title;
        job.description = updatedJob.description;
        // Update other job properties as needed
        await job.save();
        res.json({ message: 'Job listing updated successfully' });
    } catch (error) {
        console.error('Error updating job listing:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

/**
 * Deletes a job listing by its ID.
 * @async
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function deleteJobById(req, res) {
    try {
        const jobId = req.params.id;
        const job = await Job.findByPk(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        await job.destroy();
        res.json({ message: 'Job listing deleted successfully' });
    } catch (error) {
        console.error('Error deleting job listing:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Add more controller functions for job-related operations as needed

module.exports = {
    createJob,
    getJobById,
    updateJobById,
    deleteJobById,
};
