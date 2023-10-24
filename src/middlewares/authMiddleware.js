const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");

function authenticateJWT(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    console.error("Token missing");
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    console.log("Verifying token:", token);
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded user:", decoded);

    req.user = decoded; // Attach the decoded user data to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({ message: "Authentication token is invalid" });
  }
}

function checkAuthentication(req, res, next) {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User is not authenticated" });
  }
  next();
}

function checkUserRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Access forbidden: Insufficient permissions" });
    }
  };
}

module.exports = {
  authenticateJWT,
  checkAuthentication,
  checkUserRole,
};
