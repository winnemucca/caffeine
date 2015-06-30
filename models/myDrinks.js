var mongoose = require('mongoose');

var MyDrinkSchema = mongoose.Schema({
  // _id: Number,
  name: String,
  postedBy: {
  	type:mongoose.Schema.Types.ObjectId,
  	ref: 'accounts'
  },
  date: {
    type: Date,
    default: Date.now()
  },
  caffeineLevel: String,
  drinks: [{type: mongoose.Schema.Types.ObjectId,
  	ref:'Drink'}]
  // setting it to an array of ObjectIds
});

var myDrink = mongoose.model('MyDrink',MyDrinkSchema);

module.exports = myDrink;

// myDrink.find({name:''}).populate('drinkWant').exec(function(err,results){
// console.log(results)})