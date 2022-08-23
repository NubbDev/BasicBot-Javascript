

const UserSchema = {
  _id: { type: String },
  userId: {type: String},
  xp: 0,
  totalXp: 0,
  level: 0,
  balance: 0,
  banned: false,
  muted: false,
  messages: 0,
  lastUpdated: new Date() ,
};

module.exports = UserSchema;
