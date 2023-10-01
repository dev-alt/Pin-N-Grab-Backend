const Email = require('./Email');
const User = require('./User');
const UserProfile = require('./UserProfile');



User.hasMany(Email, { foreignKey: 'senderUserId', as: 'sentEmails' });
User.hasMany(Email, { foreignKey: 'recipientUserId', as: 'receivedEmails' });

UserProfile.belongsTo(User);
User.hasOne(UserProfile);
