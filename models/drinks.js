var mongoose = require('mongoose');

var drinkSchema = mongoose.Schema({
  name: String,
  date: {
    type:Date,
    // default: new Date()
    default: Date.now()

  },
  caffeineLevel: String
});

var Drink = mongoose.model('Drink',drinkSchema);

module.exports = Drink;