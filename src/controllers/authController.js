const bcrypt = require('bcrypt');
const User = require('../models/User');

/**
 * Registers a new user with the provided username, email, and password.
 * @async
 * @function registerUser
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves when the user is registered.
 */
async function registerUser(req, res) {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  registerUser,
};
