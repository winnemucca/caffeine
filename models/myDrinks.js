var mongoose = require('mongoose');

var myDrinkSchema = mongoose.Schema({
  _id: Number,
  name: String,
  date: {
    type:Date,
    default: Date.now()
  },
  caffeineLevel: String
  drinks: [{type: Schema.Types.ObjectId,ref:'Drink'}];
  // setting it to an array of ObjectIds
});

var myDrink = mongoose.model('myDrink',myDrinkSchema);

module.exports = myDrink;

// myDrink.find({name:''}).populate('drinkWant').exec(function(err,results){
// console.log(results)})