const bcrypt = require("bcrypt");
const User = require("../models/User");
const UserProfile = require("../models/UserProfile");
const sequelize = require("../utils/db");


async function registerUser(req, res) {
  const { username, email, password, firstName, lastName } = req.body;

  const t = await sequelize.transaction(); // Start a Sequelize transaction

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a user record
    const user = await User.create(
      {
        username,
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
      { transaction: t }
    );

    // Create a user profile record associated with the user
    await UserProfile.create(
      {
        UserId: user.id, // Associate the user with the profile
      },
      { transaction: t }
    );

    await t.commit(); // Commit the transaction

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    await t.rollback(); // Rollback the transaction in case of an error

    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  registerUser,
};
