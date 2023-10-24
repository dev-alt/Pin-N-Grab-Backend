const UserProfile = require("../models/UserProfile");
const User = require("../models/User");

async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: ["id", "username"], // Specify the attributes to retrieve
    });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ error: "Internal server error, could not retrieve all users" });
  }
}

async function getUserProfile(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      include: {
        model: UserProfile,
        attributes: { exclude: ["userId"] },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If the user has a profile, the related data will be included
    if (user.UserProfile) {
      // Construct the response object with data from both tables
      const response = {
        username: user.username,
        user: {
          // Include the desired user fields here
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          // Add other user fields you want to include
        },
        profile: user.UserProfile,
      };
      res.json(response);
    } else {
      res.status(404).json({ error: "User profile not found" });
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function updateUserProfile(req, res) {
  try {
    const userId = req.params.id;
    const updatedProfile = req.body;
    const user = await User.findByPk(userId, {
      include: UserProfile,
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.UserProfile = updatedProfile;
    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
};
