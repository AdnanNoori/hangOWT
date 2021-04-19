const mongoose = require('mongoose');
const { DB_IP } = require('../config.js');

mongoose.connect(`mongodb+srv://${DB_IP}/hangOWT`, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('mongoose connected')
  })
  .catch((err) => {
    console.log(err);
  })

module.exports = { mongoose };