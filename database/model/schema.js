const { mongoose } = require('../index.js');

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  location: Object,
  status: String,
  events: {type: Array, default: []},
  friends: {type: Array, default: []}
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