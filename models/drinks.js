var mongoose = require('mongoose');

var drinkSchema = mongoose.Schema({
	// user: {type: Number, ref:'myDrink'},
  	name: String,
  	date: {
    type:Date,
    default: Date.now()
  },
  editable: {
    	type: Boolean,
    	default: true
  },

  caffeineLevel: String
});

var Drink = mongoose.model('Drink',drinkSchema);

module.exports = Drink;