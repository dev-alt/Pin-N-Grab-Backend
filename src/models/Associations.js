const User = require("./User");
const Job = require("./Job");
const Application = require("./Application");
const Message = require("./Message");
const UserProfile = require("./UserProfile");
const UserReview = require("./UserReview");
const Category = require("./Category");
const Location = require("./Location");
const SavedJob = require("./SaveJob");

// Define associations
// Add or modify the foreign key associations with the onDelete option
Message.belongsTo(User, { foreignKey: 'senderUserId', as: 'sender', onDelete: 'CASCADE' });
Message.belongsTo(User, { foreignKey: 'recipientUserId', as: 'recipient', onDelete: 'CASCADE' });


User.hasMany(Application, { foreignKey: "user_id" });
User.hasOne(UserProfile);
User.hasMany(SavedJob, { foreignKey: "userId" });

Job.hasMany(Application, { foreignKey: "job_id" });
Job.belongsTo(User, {
  foreignKey: "user_id",
  indexes: [{ fields: ["user_id"] }],
});
Job.belongsTo(Category, { foreignKey: "category_id" });
Job.belongsTo(Location, {
  foreignKey: { name: "location_id", allowNull: false },
});
Job.hasMany(SavedJob, { foreignKey: "jobId" });
SavedJob.belongsTo(Job, { foreignKey: "jobId" });

UserReview.belongsTo(User, {
  foreignKey: "reviewerUserId",
  as: "reviewer",
  onDelete: "CASCADE",
});
UserReview.belongsTo(Job, { foreignKey: "jobId", onDelete: "CASCADE" });

Application.belongsTo(User, { foreignKey: "user_id" });

module.exports = {
  User,
  Job,
  Application,
  Message,
  UserProfile,
  UserReview,
  SavedJob,
  Category,
  Location,
};
