var express = require('express');
var router = express.Router();

var Drink = require('../models/drinks.js');




router.post('/drinks',function(req,res,next){
	console.log(req.body);
	var formData = req.body;
	var newDrink = new Drink({
		name: formData.name,
		date: formData.date,
		caffeine: formData.caffeineLevel
	});

	newDrink.save(function(err,result){
		if(err) {
			res.send(err);
		}
		res.send(result);
	})
})

module.exports = router;