const { Schema } = mongoose;

module.exports = {
  userSchema: new Schema({
    username: String,
    password: String,
    location: Object,
    status: String,
    events: Array,
    friends: Array
  }),

  eventsSchema: new Schema({
    location: Object,
    address: String,
    date: Date,
    title: String,
    inviteList: Array
  })
}