const Email = require("../models/Email"); // Import your Email model
const User = require("../models/User"); // Import your User model

/**
 * Sends an email from one user to another.
 * @async
 * @function sendEmail
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function sendEmail(req, res) {
  try {
    const { senderUserId, recipientUserId, subject, message, date, content } =
      req.body;

    // Check if sender and recipient users exist
    const senderUser = await User.findByPk(senderUserId);
    const recipientUser = await User.findByPk(recipientUserId);

    if (!senderUser || !recipientUser) {
      return res
        .status(404)
        .json({ error: "Sender or recipient user not found" });
    }

    // Create a new email record
    const email = await Email.create({
      senderUserId,
      recipientUserId,
      subject,
      date, // Include the date field from the request body
      content, // Include the content field from the request body
      // Add any other email-related fields here
    });

    res.status(201).json({ message: "Email sent successfully", email });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Retrieves the inbox (received emails) for a user.
 * @async
 * @function getInbox
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function getInbox(req, res) {
  try {
    const userId = req.user.id; // Assuming you're using JWT authentication

    // Retrieve all emails where the user is the recipient
    const inbox = await Email.findAll({
      where: {
        recipientUserId: userId,
      },
      // Include sender information if needed
      include: User, // Include the sender user model
    });

    res.json(inbox);
  } catch (error) {
    console.error("Error fetching inbox:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Retrieves starred emails for a user.
 * @async
 * @function getStarredEmails
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function getStarredEmails(req, res) {
  try {
    const userId = req.user.id; // Assuming you're using JWT authentication

    // Retrieve all starred emails for the user
    const starredEmails = await Email.findAll({
      where: {
        recipientUserId: userId,
        isStarred: true,
      },
      // Include sender information if needed
      include: User, // Include the sender user model
    });

    res.json(starredEmails);
  } catch (error) {
    console.error("Error fetching starred emails:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Deletes an email by its ID.
 * @async
 * @function deleteEmail
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 */
async function deleteEmail(req, res) {
  try {
    const emailId = req.params.id;

    // Check if the email exists
    const email = await Email.findByPk(emailId);

    if (!email) {
      return res.status(404).json({ error: "Email not found" });
    }

    // Perform the deletion
    await email.destroy();

    res.json({ message: "Email deleted successfully" });
  } catch (error) {
    console.error("Error deleting email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function viewEmail(req, res) {
  try {
    const emailId = req.params.id;

    // Retrieve the email by its ID
    const email = await Email.findByPk(emailId);

    if (!email) {
      return res.status(404).json({ error: "Email not found" });
    }

    // You can add additional logic or processing here if needed

    res.json(email);
  } catch (error) {
    console.error("Error viewing email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function starEmail(req, res) {
  try {
    const emailId = req.params.id;

    // Retrieve the email by its ID
    const email = await Email.findByPk(emailId);

    if (!email) {
      return res.status(404).json({ error: "Email not found" });
    }

    // Toggle the 'isStarred' property
    email.isStarred = !email.isStarred;

    // Save the changes to the email
    await email.save();

    res.json({ message: "Email starred/unstarred successfully", email });
  } catch (error) {
    console.error("Error starring email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// You can add more email-related controller methods as needed

module.exports = {
  sendEmail,
  getInbox,
  getStarredEmails,
  deleteEmail,
  viewEmail,
  starEmail,
};
