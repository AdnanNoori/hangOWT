const { mongoose } = require('../index.js');
const { User, Event } = require('./schema.js');

module.exports = {

  register: async (req, res) => {

    const { username, password } = req.body;
    try {
      const userExists = await User.exists({ username });

      if (userExists) {
        res.send(409);
      } else {
        const userData = await User.create({ username, password });
        res.status(201).send({ "_id": userData['_id'], events: [], username: userData.username, friends: [], requestedFriendsList: [], pendingFriendsList: [] });
      }
    } catch(err) {
      console.log(err);
      res.sendStatus(404);
    }
  },

  login: async (req, res) => {
    const { username, password } = req.query;

    try {
      const userInfo = await User.findOne({ username })
        .select({ password: 0 })
        .lean();

      const eventsPromises = Object.keys(userInfo.events).map((key) => {
        return Event.findOne({ _id: userInfo.events[key] })
      });
      const friendList = [];
      const requestedFriendsList = [];
      const pendingFriendsList = [];

      Object.keys(userInfo.friends).forEach((friend) => {
        if (userInfo.friends[friend] === 0) {
          pendingFriendsList.push(friend);
        } else if (userInfo.friends[friend] === 1) {
          requestedFriendsList.push(friend);
        } else if (userInfo.friends[friend] === 2) {
          friendList.push(friend);
        }
      });

      const friendsPromises = friendList.map((friend) => {
        return User.findOne({ username: friend })
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
      console.log(err);
      res.sendStatus(401);
    }
  },

  setUserLocation: async (req, res) => {
    const { userID, coordinates } = req.body;

    try {
      await User.findOneAndUpdate({_id: userID }, { coordinates });
      res.sendStatus(200);
    }catch(err) {
      console.log(err);
      res.sendStatus(404);
    }
  },

  createEvent: async (req, res) => {
    const { location, address, date, title, inviteList } = req.body.event;

    try {

      var eventID = mongoose.Types.ObjectId();
      await Event.create({ '_id': eventID, location, address, date, title, inviteList });

      const friendInvitePromises = Object.keys(inviteList).map((key) => {

        return User.findOne({ '_id': key })
          .then((userData) => {
            console.log(userData);
            userData.events[key] = { eventID };
            userData.markModified('events');
            userData.save();
          })
        //return User.updateOne({ '_id': key }, { $set: { eventString: eventID } });
      })

      Promise.all(friendInvitePromises)
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

      let userData = await User.findOne({ username })
      userData.friends[requestFriendUserName] = 1;
      userData.markModified('friends');
      await userData.save();

      let friendData = await User.findOne({ username: requestFriendUserName })
      friendData.friends[username] = 0;
      friendData.markModified('friends');
      await friendData.save();
      res.sendStatus(200);

    } catch(err) {
      console.log(err);
      res.sendStatus(404);
    }
  },

  acceptFriend: async (req, res) => {
    const { username, requestFriendUserName } = req.body;
    console.log(username)
    try {
      let userData = await User.findOne({ username })
      userData.friends[requestFriendUserName] = 2;
      userData.markModified('friends');
      await userData.save();


      let friendData = await User.findOne({ username: requestFriendUserName })
      friendData.friends[username] = 2;
      friendData.markModified('friends');
      await friendData.save();
      res.sendStatus(200);

    } catch(err) {
      console.log(err);
      res.sendStatus(404);
    }
  },


  rejectFriend: async (req, res) => {
    const { username, requestFriendUserName } = req.body;
    console.log(username)
    try {

      let userData = await User.findOne({ username })
      delete userData.friends[requestFriendUserName];
      userData.markModified('friends');
      await userData.save();

      let friendData = await User.findOne({ username: requestFriendUserName })
      delete friendData.friends[username];
      friendData.markModified('friends');
      await friendData.save();
      res.sendStatus(200);

    } catch(err) {
      console.log(err);
      res.sendStatus(404);
    }
  }

}