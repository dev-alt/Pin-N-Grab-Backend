const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");

// Generate and send a JWT when a user logs in or registers
function sendJWTResponse(res, user) {
  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
    expiresIn: "4h", // Set the expiration time for the token
  });
  res.json({ token });
}

module.exports = sendJWTResponse;
