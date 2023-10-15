const Email = require('./Email');
const User = require('./User');
const UserProfile = require('./UserProfile');
const Application = require('./Application');


User.hasMany(Email, { foreignKey: 'senderUserId', as: 'sentEmails' });
User.hasMany(Email, { foreignKey: 'recipientUserId', as: 'receivedEmails' });
User.hasMany(Application, {
    foreignKey: 'user_id',
  });
  


UserProfile.belongsTo(User);
User.hasOne(UserProfile);

