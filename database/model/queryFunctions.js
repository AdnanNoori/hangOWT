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

      const friendsPromises = userInfo.events.map((friend) => {
        return User.findOne({ _id: friend })
          .select({ password: 0, friends: 0, events: 0 });
      });

      Promise.all(eventsPromises)
        .then((events) => {
          Promise.all(friendsPromises)
            .then((friends) => {
              userInfo.events = events;
              userInfo.friends = friends;
              res.status(200).send(userInfo);
            })
        })

    } catch(err) {
      res.sendStatus(401);
    }
  },

  createEvent: async (req, res) => {
    const { location, address, date, title, inviteList } = req.body;

    try {

      var eventId = mongoose.Types.ObjectId();
      await Event.create({ _id: eventId, location, address, date, title, inviteList });

      const friendInvitePromises = inviteList.map((friend) => {
        return User.update({ _id: friend._id }, { $push: { events: eventId } });
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

  updateStatus: (req, res) => {
    const { userID, status } = req.body;

    try {

      await User.updateOne({_id: userId}, { status });
      res.send(200);

    } catch(err) {
      console.log(err);
      res.sendStatus(404);
    }
  },

  updateLocation: (req, res) => {

  }

}