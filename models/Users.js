const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  congregation: String,
  time: [
    {
      month: String,
      placements: Number,
      videoShowings: Number,
      hours: Number,
      returnVisits: Number,
      bibleStudies: Number,
    },
  ],
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
