const { mongoose } = require('../index.js');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  coordinates: {type: Object, default: [0,0]},
  status: String,
  profilePicture: String,
  events: {type: Array, default: []},
  friends: {type: Object, default: {}} //0 pending, 1 requested, 2 accepted
});

const eventsSchema = mongoose.Schema({
  location: Object,
  address: String,
  date: Date,
  title: String,
  inviteList: Array
});

module.exports.User = mongoose.model('User', userSchema);
module.exports.Event = mongoose.model('Event', eventsSchema);