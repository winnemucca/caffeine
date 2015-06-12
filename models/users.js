// var mongoose = require('mongoose');
// var crypto = require('crypto');
// var userSchema = mongoose.Schema({
//   name: {
//   	type: String,
//   	lowercase: true,
//   	unique: true
//   },
//   hash: String,
//   salt: String
// });

// userSchema.methods.setPassword = function(password){
// 	this.salt = crypto.randomBytes(16).toString('hex');
// 	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
// }

// var Drink = mongoose.model('Drink',userSchema);

// module.exports = Drink;