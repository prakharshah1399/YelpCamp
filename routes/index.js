var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

//root route
router.get('/', function(req, res) {
	res.render('landing');
});


//====================
//AUTH ROUTES
//====================

//show register form
router.get('/register',(req,res)=>{
	res.render('register');
});

//handles sign up logic
router.post('/register',(req,res)=>{
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err,user)=>{
		if(err){
			console.log(err);
			return res.render('register',{error : err.message});
		}
		passport.authenticate('local')(req,res,()=>{
			req.flash('success','Welcome to YelpCamp '+user.username);			
			res.redirect('/campgrounds');
		});
	});
});

//login form
router.get('/login',(req,res)=>{
	res.render('login');
});

//login logic
router.post('/login',passport.authenticate('local',{
	successRedirect: '/campgrounds',
	successFlash : 'Successfully logged in',
	failureRedirect: '/login',
	failureFlash : 'Try Again'
}),(req,res)=>{});

//logout route
router.get('/logout',(req,res)=>{
	req.logout();
	req.flash('success', 'Logged you out')   //always pass flash msg before redirecting
	res.redirect('/campgrounds');
});


module.exports = router;