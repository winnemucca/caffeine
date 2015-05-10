var mongoose = require('mongoose');

var drinkSchema = mongoose.Schema({
	name: String,
	description: String,
	caffeine: String

});

var Drink = mongoose.model('Drink',drinkSchema);

module.exports = Drink;