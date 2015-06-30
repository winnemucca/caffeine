var express = require('express');
var router = express.Router();
// var moment = require('moment');
var Drink = require('../models/drinks.js');


// get all drinks from collection
router.get('/drinks',function(req,res){
  Drink.find(function(err,result){
    if(err){
      res.send(err);
    }
    res.send(result);
  });
});

// add drink to collection
router.post('/drinks',function(req,res,next){
  // console.log(req.body);
  var formData = req.body;
  var newDrink = new Drink({
    name: formData.name,
    date: formData.date,
    // date: moment(formData.date).toDate(),
    caffeineLevel: formData.caffeineLevel
  });

  newDrink.save(function(err,result){
    if(err) {
      res.send(err);
    }
    res.send(result);
  });
});

// access individual drink by id
router.get('/drink/:drink_id',function(req,res,next){
  Drink.findById(req.params.id,function(err,post){
    if(err) return next(err);
    //
    res.send(post);
  });
});

// delete individual drink by id
router.delete('/drink/:drink_id',function(req,res,next){
  // res.send(req.params.drink_id);
  Drink.findByIdAndRemove(req.params.drink_id,function(err,post){
    if(err) return next(err);
    res.send(post);
  });
});

// update individual drink by id
router.put('/drink/:id',function(req,res,next){
  Drink.findByIdAndUpdate(req.params.id, req.body,function(err,post){
    if(err) return next(err);
    res.send('success');
  });
});


module.exports = router;