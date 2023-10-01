const UserProfile = require('../models/UserProfile');
const User = require('../models/User');



async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username'], // Specify the attributes to retrieve
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error, could not retrieve all users' });
  }
}

/**
 * Retrieves the user profile for a given user ID.
 * @async
 * @function
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Object} The user profile object for the given user ID.
 */
async function getUserProfile(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      include: UserProfile,
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Check if the user has a profile
    if (!user.UserProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.json(user.UserProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Updates the profile of a user with the given ID.
 * @async
 * @function updateUserProfile
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The response object with a success or error message.
 * @throws {Error} If there was an error updating the user profile.
 */
async function updateUserProfile(req, res) {
  try {
    const userId = req.params.id;
    const updatedProfile = req.body; // Ensure you validate and sanitize the data
    const user = await User.findByPk(userId, {
      include: UserProfile,
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.UserProfile = updatedProfile;
    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
};
