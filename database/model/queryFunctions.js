const { mongoose } = require('../index.js');
const { User, Event } = require('./schema.js');

module.exports = {

  register: async (req, res) => {

    try {
      const userExists = await User.exists({ username: req.body.username });

      if (userExists) {
        res.send(409);
      } else {
        const { username, password } = req.body;
        await User.create({ username, password });
        res.sendStatus(201)
      }
    } catch(err) {
      console.log(err);
      res.sendStatus(404);
    }
  },

  login: async (req, res) => {
    const { username, password } = req.params;

    try {
      const userInfo = await User.findOne({ username, password })
        .select({ password: 0 });

      const eventsPromises = userInfo.events.map((event) => {
        return Event.findOne({ _id: event })
      });
      const friendList = [];
      const requestedFriendsList = [];
      const pendingFriendsList = [];

      Object.key(userInfo.friends).forEach((friend) => {
        if (userInfo.friends[friend] === 0) {
          pendingFriendsList.push(friend);
        } else if (userInfo.friends[friend] === 1) {
          requestedFriendsList.push(friend);
        } else if (userInfo.friends[friend] === 2) {
          friendList.push(friend);
        }
      });

      const friendsPromises = friendList.map((friend) => {
        return User.findOne({ friend.username })
          .select({ password: 0, friends: 0, events: 0});
      });

      Promise.all(eventsPromises)
        .then((events) => {
          Promise.all(friendsPromises)
            .then((friends) => {
              userInfo.events = events;
              userInfo.friends = friends;
              res.status(200).send({ ...userInfo, requestedFriendsList, pendingFriendsList });
            })
        })

    } catch(err) {
      res.sendStatus(401);
    }
  },

  createEvent: async (req, res) => {
    const { location, address, date, title, inviteList } = req.body;

    try {

      var eventID = mongoose.Types.ObjectId();
      await Event.create({ _id: eventID, location, address, date, title, inviteList });

      const friendInvitePromises = inviteList.map((friend) => {
        return User.update({ username: friend.username }, { $push: { events: eventId } });
      })

      Promises.all(friendInvitePromises)
        .then(() => {
          res.sendStatus(200);
        })

    } catch(err) {
      console.log(err);
      res.sendStatus(404)
    }
  },

  updateStatus: async (req, res) => {
    const { username, status } = req.body;

    try {

      await User.updateOne({ username }, { status });
      res.sendStatus(200);

    } catch(err) {
      console.log(err);
      res.sendStatus(404);
    }
  },

  updateLocation: async (req, res) => {
    const { username, location } = req.body;

    try {

      await User.updateOne({ username }, { location });
      res.sendStatus(200)

    } catch(err) {
      console.log(err);
      res.sendStatus(404);
    }
  },

  requestFriend: async (req, res) => {
    const { username, requestFriendUserName } = req.body;

    try {

      await User.updateOne({ username }, { $set: { `friendsPending.${requestFriendUserName}`: 1 } });
      await User.updateOne({ username: requestFriendUserName }, { $set: { `friendsPending.${username}`: 0 } })

    } catch(err) {
      console.log(err);
      res.sendStatus(404);
    }
  },

  acceptFriend: async (req, res) => {
    const { username, requestFriendUserName } = req.body;

    try {

      await User.updateOne({ username }, { $set : {`friends.${requestFriendUserName}`: 2 } })
      await User.updateOne({ username: requestFriendUserName }, { $set : {`friends.${username}`: 2 } })
    }
  },


  rejectFriend: async (req, res) => {
    const { username, requestFriendUserName } = req.body;

    try {

      let userData = await User.findOne({ username })
      delete userData.friends[requestFriendUserName];
      userData.markModified('friends');
      await userData.save();

      let friendData = await User.findOne({ username: requestFriendUserName })
      delete friendData.friends[username];
      friendData.markModified('friends');
      await friendData.save();

    }
  }

}