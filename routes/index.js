var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/register',function(req,res){
	res.render('register',{});
});

router.post('/register',function(req,res){
	Account.register(new Account({ username: req.body.username}),req.body.password,function(err,account){
			if(err){
				return res.render('register',{account:account});
			}

			passport.authenticate('local')(req,res,function(){
				res.redirect('/home');
			});
	});
});

router.get('/login',function(req,res){
	res.render('login',{user: req.user});
});

router.post('/login',passport.authenticate('local'),function(req,res){
		res.redirect('/home');
});


router.get('/logout',function(req,res){
	req.logout();
	res.redirect('/home');
});

router.get('/ping',function(req,res){
	res.status(200).send('pong');
});



router.get('/templates/:templateid' ,function(req,res,next){
	res.render('templates/' + req.params.templateid);
});




module.exports = router;
