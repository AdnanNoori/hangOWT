const express = require('express');
const app = express();
const port = 3000;


app.get('/userData', (req,res) => {
  res.send(data)
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});


var data = {
  friendsList: [
    {
      id: '1',
      title: 'Andy',
      coordinates: {latitude: 37.7779911, longitude: -122.392759},
    },
    {
      id: '2',
      title: 'Jessica',
      coordinates: {latitude: 37.7679911, longitude: -122.399759},
    },
    {
      id: '3',
      title: 'Carl',
      coordinates: {latitude: 37.7699911, longitude: -122.392759},
    },
    {
      id: '4',
      title: 'Jasmine',
      coordinates: {latitude: 37.7579911, longitude: -122.392759},
    },
    {
      id: '5',
      title: 'Fred',
      coordinates: {latitude: 37.7079911, longitude: -122.392759},
    },
    {
      id: '6',
      title: 'Alex',
      coordinates: {latitude: 37.7891669, longitude: -122.4165994},
    },

  ],

  eventList: [
    {
      address: "Fisherman's Wharf, San Francisco, CA, USA",
      coordinates: {latitude: 37.8091669, longitude: -122.4165994},
      date: '2021-04-10T19:00:10.000Z',
      inviteList: [{id: "2", title: "Jessica"}, {id:"4", title: "Jasmine"}],
      title: "Lets go hangout with seal"
    },

    {
      address: "The Pub, Ownes Stree, San Francisco, CA, USA",
      coordinates: {latitude: 37.7679911, longitude: -122.392759},
      date: '2021-04-10T19:00:10.000Z',
      inviteList: [{id: "4", title: "Jasmine"}, {id: "6", title: "Alex"}, {id: "1", title: "Andy"}],
      title: "Lets go hangout with seals"
    },

    {
      address: "Clinton Park, San Francisco, CA, USA",
      coordinates: {latitude: 37.769338, longitude: -122.4214935},
      date: '2021-04-18T17:00:56.000Z',
      inviteList: [{id: "3", title: "Carl"}, {id:"5", title: "Fred"}],
      title: "Let’s picnic"
    },

    {"address": "Legion of Honor, 34th Avenue, San Francisco, CA, USA", "coordinates": {"latitude": 37.78455795, "longitude": -122.50095497618373}, "date": "2021-04-10T19:00:58.000Z",
    inviteList: [{id:"3", title: "Carl"}, {id:"5", title: "Fred"}],
    "title": "Let’s checkout the museum"}
  ]
}