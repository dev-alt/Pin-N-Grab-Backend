const SavedJob = require("../models/SaveJob");

const saveJob = async (req, res) => {
  const { userId, jobId } = req.params;

  try {
    // Create a new SavedJob record
    await SavedJob.create({ userId, jobId });
    res.status(201).json({ message: "Job saved successfully" });
  } catch (error) {
    console.error("Error saving job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const unsaveJob = async (req, res) => {
  const { userId, jobId } = req.params;

  try {
    // Find and delete the SavedJob record
    await SavedJob.destroy({
      where: { userId, jobId },
    });
    res.status(200).json({ message: "Job unsaved successfully" });
  } catch (error) {
    console.error("Error unsaving job:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { saveJob, unsaveJob };
