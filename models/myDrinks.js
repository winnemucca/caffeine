var mongoose = require('mongoose');

var myDrinkSchema = mongoose.Schema({
  name: String,
  date: {
    type:Date,
    // default: new Date()
    default: Date.now()

  },
  caffeineLevel: String
  // drinkWant: [{type:mongoose.Schema.Types.ObjectId,ref:'Drink'}]
});

var myDrink = mongoose.model('myDrink',myDrinkSchema);

module.exports = myDrink;