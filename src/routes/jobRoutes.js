const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/jobs/create:
 *   post: # Specify the HTTP method as POST
 *     summary: Create a new job
 *     description: Create a new job posting.
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location_id:
 *                 type: integer
 *               deadline:
 *                 type: string
 *                 format: date
 *               paymentType:
 *                 type: string
 *               jobStatus:
 *                 type: string
 *                 enum: ['Open', 'Closed', 'Deleted']
 *               category_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Job created successfully.
 *       400:
 *         description: Invalid jobStatus value.
 *       500:
 *         description: Internal server error.
 */
router.post("/create", authMiddleware.authenticateJWT, jobController.createJob);

/**
 * @swagger
 * /api/jobs/delete/{id}:
 *   post:
 *     summary: Delete a job by ID
 *     description: Delete a job posting by its ID.
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the job to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Job deleted successfully.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/delete/:id",
  authMiddleware.authenticateJWT,
  jobController.deleteJobById
);

/**
 * @swagger
 * /api/jobs/update/{id}:
 *   put: # Specify the HTTP method as PUT
 *     summary: Update a job by ID
 *     description: |
 *       Update a job posting by its ID.
 *       You can provide more detailed information here.
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the job to update.
 *         schema:
 *           type: integer
*     security:
 *       - BearerAuth: []
 *       - in: body
 *         name: job
 *         description: The updated job object.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             # Add more properties here for the updated job object
 *     responses:
 *       200:
 *         description: Job updated successfully.
 *       500:
 *         description: Internal server error.
 */
router.put(
  "/update/:id",
  authMiddleware.authenticateJWT,
  jobController.updateJobById
);

/**
 * @swagger
 * /api/jobs/get/{id}:
 *   get:
 *     summary: Get a job by ID
 *     description: Retrieve a job posting by its ID.*     
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the job to retrieve.
 *         schema:
 *           type: integer
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: Job retrieved successfully.
 *       500:
 *         description: Internal server error.
 */
router.get("/get/:id", jobController.getJobById);

/**
 * @swagger
 * /api/jobs/all:
 *   get:
 *     summary: Get all jobs
 *     description: Retrieve a list of all job postings.
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: Jobs retrieved successfully.
 *       500:
 *         description: Internal server error.
 */
router.get("/all", jobController.getJobs);

/**
 * @swagger
 * /api/jobs/applyForJob/{jobId}:
 *   post:
 *     summary: Apply for a job
 *     description: Submit an application for a job posting.
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         description: The ID of the job to apply for.
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               applicationText:
 *                 type: string
 *     responses:
 *       201:
 *         description: Application submitted successfully.
 *       400:
 *         description: Invalid application or job not open for applications.
 *       500:
 *         description: Internal server error.
 * security:
 *   - JWT: []
 */
router.post(
  "/applyForJob/:jobId",
  authMiddleware.authenticateJWT,
  jobController.applyForJob
);

/**
 * @swagger
 * /api/locations/{id}:
 *   get:
 *     summary: Get location by ID
 *     description: Retrieve location data by its ID.
 *     tags: [Locations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the location to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Location retrieved successfully.
 *       404:
 *         description: Location not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/locations/all", jobController.getAllLocations);

/**
 * @swagger
 * /api/jobs/saved/{id}:
 *   get:
 *     summary: Get saved jobs for a user by user ID.
*     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user for whom saved jobs are to be fetched.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of saved jobs for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       404:
 *         description: No saved jobs found for the user.
 *         content:
 *           application/json:
 *             example:
 *               error: No saved jobs found for this user
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
router.get("/saved/:id", authMiddleware.authenticateJWT, jobController.getSavedJobs);


/**
 * @swagger
 * /api/jobs/applied/{id}:
 *   get:
 *     summary: Get applied jobs for a user by user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user for whom applied jobs are to be fetched.
*     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of applied jobs for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       404:
 *         description: No applied jobs found for the user.
 *         content:
 *           application/json:
 *             example:
 *               error: No applied jobs found for this user
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
router.get("/applied/:id", authMiddleware.authenticateJWT, jobController.getAppliedJobs);


/**
 * @swagger
 * /api/jobs/{id}/close:
 *   patch:
 *     summary: Close a job.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the job to close.
*     tags: [Jobs]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Job closed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message confirming that the job was closed successfully.
 *       404:
 *         description: Job not found.
 *         content:
 *           application/json:
 *             example:
 *               error: Job not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
router.patch("/:id/close", authMiddleware.authenticateJWT, jobController.setJobClosed);

/**
 * @swagger
 * /api/jobs/{jobId}/markCompleted:
 *   post:
 *     summary: Mark a job as completed.
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the job to mark as completed.
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               selectedUserId:
 *                 type: integer
 *                 description: The ID of the user selected to complete the job.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Job marked as completed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message confirming that the job was marked as completed.
 *                 job:
 *                   $ref: '#/components/schemas/Job'
 *                 notificationMessage:
 *                   $ref: '#/components/schemas/Message'
 *       400:
 *         description: Job not found or not open for completion, or selected user not found.
 *         content:
 *           application/json:
 *             example:
 *               error: Job not found or not open for completion.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               error: Internal server error
 */
router.post("/:jobId/markCompleted", authMiddleware.authenticateJWT, jobController.markJobAsCompleted);


module.exports = router;
