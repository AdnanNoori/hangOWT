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

  createEvent: (req, res) => {

  },

  updateStatus: (req, res) => {

  },

  updateLocation: (req, res) => {

  }

}