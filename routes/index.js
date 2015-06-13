var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/register',function(req,res){
	Account.register(new Account({ username: req.body.username}),req.body.password,function(err,account){
			if(err){
				return res.status(500).json({err:err});
			}

			passport.authenticate('local')(req,res,function(){
				return res.status(200).json({status: 'Registration successful'});
			});
	});
});



router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(500).json({err: err});
    }
    if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({status: 'Login successful!'});
    });
  })(req, res, next);
});




router.get('/logout',function(req,res){
	req.logout();
	res.status(200).json({status: 'logout'});
});



router.get('/templates/:templateid' ,function(req,res,next){
	res.render('templates/' + req.params.templateid);
});




module.exports = router;
