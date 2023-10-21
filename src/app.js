const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const JobRoutes = require("./routes/jobRoutes");
const messageRoutes = require("./routes/messageRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const sequelize = require("./utils/db");
const { swaggerUi, specs } = require("./swagger");
require("./models/Associations"); // associations.js file

const app = express();

app.use(cors()); // Use CORS middleware
app.use(express.json()); // Parse JSON requests

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs)); // Swagger documentation

// Routes
app.use("/api/users", userRoutes);
app.use("/api/jobs", JobRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/review", reviewRoutes);

sequelize
  .sync({ alter: true }) // sync your models and updates the schema if needed
  .then(() => {
    console.log("Database synced");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

module.exports = app;
