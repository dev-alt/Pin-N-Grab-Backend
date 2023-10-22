const Message = require("../models/Message"); // Import your Message model
const User = require("../models/User"); // Import your User model

async function sendMessage(req, res) {
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

    // Create a new message record
    const sendMessage = await Message.create({
      senderUserId,
      recipientUserId,
      subject,
      date, // Include the date field from the request body
      content, // Include the content field from the request body
      // Add any other message-related fields here
    });

    res.status(201).json({ message: "Message sent successfully", message });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getInbox(req, res) {
  try {
    const userId = req.user.id; // Assuming you're using JWT authentication

    // Retrieve all messages where the user is the recipient
    const inbox = await Message.findAll({
      where: {
        recipientUserId: userId,
      },
      // Include sender information if needed
      include: [
        {
          model: User,
          as: "sender", // Use the alias you specified
        },
      ],
    });

    res.json(inbox);
  } catch (error) {
    console.error("Error fetching inbox:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteMessage(req, res) {
  try {
    const messageId = req.params.id;

    // Check if the message exists
    const message = await Message.findByPk(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Perform the deletion
    await message.destroy();

    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function viewMessage(req, res) {
  try {
    const messageId = req.params.id;

    // Retrieve the message by its ID
    const message = await Message.findByPk(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // You can add additional logic or processing here if needed

    res.json(message);
  } catch (error) {
    console.error("Error viewing message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function markAsRead(req, res) {
  try {
    const messageId = req.params.id;

    // Check if the message exists
    const message = await Message.findByPk(messageId);

    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Check if the recipient is the currently authenticated user (you might need to implement proper user authentication)
    if (message.recipientUserId !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    // Update the message to mark it as read
    message.read = true;
    await message.save();

    res.json({ message: "Message marked as read" });
  } catch (error) {
    console.error("Error marking message as read:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}



// You can add more message-related controller methods as needed

module.exports = {
  sendMessage,
  getInbox,
  deleteMessage,
  viewMessage,
  markAsRead,
};
