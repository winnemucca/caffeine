var mongoose = require('mongoose');
// var crypto = require('crypto');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account  = new Schema({
	username: {
		type: String,
		lowercase:true,
		unique: true
	},
	password: String
});

Account.plugin(passportLocalMongoose);



module.exports = mongoose.model('accounts',Account);