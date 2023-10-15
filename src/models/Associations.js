const User = require("./User");
const Job = require("./Job");
const Application = require("./Application");
const Email = require("./Email");
const UserProfile = require("./UserProfile");
const UserReview = require("./UserReview");
const Category = require("./Category");
const Location = require("./Location");
const SavedJob = require("./SaveJob");

// Define associations
User.hasMany(Email, { foreignKey: "senderUserId", as: "sentEmails" });
User.hasMany(Email, { foreignKey: "recipientUserId", as: "receivedEmails" });
User.hasMany(Application, { foreignKey: "user_id" });
User.hasOne(UserProfile);
User.hasMany(SavedJob, { foreignKey: "userId" }); // Place SavedJob associations here

Job.hasMany(Application, { foreignKey: "job_id" });
Job.belongsTo(User, {
  foreignKey: "user_id",
  indexes: [{ fields: ["user_id"] }],
});
Job.belongsTo(Category, { foreignKey: "category_id" });
Job.belongsTo(Location, {
  foreignKey: { name: "location_id", allowNull: false },
});
Job.hasMany(SavedJob, { foreignKey: "jobId" }); // Place SavedJob associations here

UserReview.belongsTo(User, {
  foreignKey: "reviewerUserId",
  as: "reviewer",
  onDelete: "CASCADE",
});
UserReview.belongsTo(Job, { foreignKey: "jobId", onDelete: "CASCADE" });

module.exports = {
  User,
  Job,
  Application,
  Email,
  UserProfile,
  UserReview,
  SavedJob,
  Category,
  Location,
};
