const Job = require("../models/Job");
const User = require("../models/User");
const Location = require("../models/Location");
const Application = require("../models/Application");
const SavedJob = require("../models/SaveJob");

async function createJob(req, res) {
  try {
    const {
      title,
      description,
      details,
      location_id,
      deadline,
      paymentAmount,
      jobStatus,
      category_id,
      user_id,
    } = req.body;

    const allowedStatusValues = ["Open", "Closed", "Deleted"];
    if (!allowedStatusValues.includes(jobStatus)) {
      return res.status(400).json({ error: "Invalid jobStatus value" });
    }

    const job = await Job.create({
      title,
      description,
      details,
      location_id,
      deadline,
      paymentAmount,
      jobStatus,
      category_id,
      user_id,
    });

    res.status(201).json({ message: "Job listing created", job });
  } catch (error) {
    console.error("Error creating job listing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function applyForJob(req, res) {
  try {
    const { applicationText, user_id } = req.body;
    const job_id = req.params.jobId;

    // Check if the job exists and is open
    const job = await Job.findOne({ where: { id: job_id, jobStatus: "Open" } });

    if (!job) {
      return res
        .status(400)
        .json({ error: "Job not found or not open for applications." });
    }

    // Check if the user is not the owner of the job
    if (job.user_id === user_id) {
      return res
        .status(400)
        .json({ error: "You cannot apply for your own job." });
    }

    // Check if the user has already applied for the job
    const existingApplication = await Application.findOne({
      where: { job_id, user_id },
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ error: "You have already applied for this job." });
    }

    // Create a new application
    const application = await Application.create({
      job_id,
      applicationText,
      user_id,
    });

    res
      .status(201)
      .json({ message: "Application submitted successfully", application });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getJobById(req, res) {
  try {
    const jobId = req.params.id;
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getJobs(req, res) {
  try {
    const jobs = await Job.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Application,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    console.log("All job listings:");
    if (!jobs) {
      return res.status(404).json({ error: "No job listings found" });
    }
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching job listings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getSavedJobs(req, res) {
  const { id } = req.params;
  console.log("User ID:", id)

  try {
    // Find all saved jobs for the specified user
    const savedJobs = await SavedJob.findAll({
      where: { userId: id },
      include: [
        {
          model: Job, // Include the associated job
          include: [
            {
              model: User,
              attributes: ["username"],
            },
            {
              model: Application,
              include: [{ model: User, attributes: ["username"] }],
            },
          ],
        },
      ],
    });

    if (!savedJobs) {
      return res
        .status(404)
        .json({ error: "No saved jobs found for this user" });
    }

    res.json(savedJobs);
  } catch (error) {
    console.error("Error fetching saved jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateJobById(req, res) {
  try {
    const jobId = req.params.id;
    const updatedJob = req.body; // Ensure you validate and sanitize the data

    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    // Update job properties based on updatedJob
    job.title = updatedJob.title;
    job.description = updatedJob.description;
    // Update other job properties as needed
    await job.save();
    res.json({ message: "Job listing updated successfully" });
  } catch (error) {
    console.error("Error updating job listing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteJobById(req, res) {
  try {
    const jobId = req.params.id;
    const job = await Job.findByPk(jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    await job.destroy();
    res.json({ message: "Job listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting job listing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAllLocations(req, res) {
  try {
    // Fetch all locations from the database
    const locations = await Location.findAll();

    // Organize the locations into a structure that suits your needs
    const locationData = locations.map((location) => ({
      id: location.id,
      name: location.name,
      // Include other properties you need
    }));

    res.json(locationData);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getAppliedJobs(req, res) {
  const { id } = req.params;
  try {
    const appliedJobs = await Application.findAll({
      where: { user_id: id },
      include: [
        {
          model: Job, // Include the associated job
          include: [
            {
              model: User,
              attributes: ["username"],
            },
            {
              model: Application,
              include: [{ model: User, attributes: ["id", "username"] }],
            },
          ],
        },
      ],
    });

    if (!appliedJobs) {
      return res.status(404).json({ error: "No applied jobs found for this user" });
    }

    res.json(appliedJobs);
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}



module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJobById,
  deleteJobById,
  getAllLocations,
  getSavedJobs,
  applyForJob,
  getAppliedJobs,
};
