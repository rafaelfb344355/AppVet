const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Pet = new Schema({
  name: {
    type: String
  },
  specie: {
    type: String
  },
 age: {
    type: Number
  },
weight: {
    type: Number
  }
},{
    collection: 'Pet'
});

module.exports = mongoose.model('Pet', Pet);