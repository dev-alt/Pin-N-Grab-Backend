const UserProfile = require('../models/UserProfile');
const User = require('../models/User');

async function getUserProfile(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId, {
      include: UserProfile,
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.UserProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

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
  getUserProfile,
  updateUserProfile,
};
