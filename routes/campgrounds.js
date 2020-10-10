var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware')                  //it automatically requires index.js coz it is a special name
//====================
//CAMPGROUNDS ROUTES
//====================

//INDEX- show all campgrounds
router.get('/', function(req, res) {
	//req.user contains all info about logged in user
	//get all campgrounds from db
	Campground.find({}, (err, allCampgrounds) => {
		if (err) {
			console.log(err);
		} else {
			res.render('campgrounds/index', { campgrounds: allCampgrounds });
		}
	});
});

//CREATE- add new campground to DB
router.post('/',middleware.isLoggedIn, function(req, res) {
	//get data from form and add to campgrounds array
	var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newCampground = { name: name, price: price, image: image, description: desc, author: author };
	//create a new campground and add it to db
	Campground.create(newCampground, (err, newlycreated) => {
		if (err) {
			console.log(err);
		} else {
			//redirect to campgrounds page
			res.redirect('/campgrounds');
		}
	});
});

//NEW- show form to create new campground
router.get('/new',middleware.isLoggedIn,function(req, res) {
	res.render('campgrounds/new');
});

//SHOW- shows more info about one campground
router.get('/:id', (req, res) => {
	//find the campground with provided id
	Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
		if (err || !foundCampground) {
			req.flash('error','Campground not found');
			res.redirect('/campgrounds');
		} else {
			//render show template with that campground
			res.render('campgrounds/show',{campground: foundCampground});
		}
	});
});

//EDIT ROUTE
router.get('/:id/edit',middleware.checkCampgroundOwnership,(req,res)=>{
	Campground.findById(req.params.id,(err,foundCampground)=>{
		if(err){
			res.redirect('/campgrounds');
		}else{
			res.render('campgrounds/edit',{campground:foundCampground});
		}
	});
});

//UPDATE ROUTE
router.put('/:id',middleware.checkCampgroundOwnership,(req,res)=>{
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,(err,foundCampground)=>{
		if(err){
			res.redirect('/campgrounds');
		}else{
			res.redirect('/campgrounds/'+req.params.id);
		}
	});
});

//DELETE ROUTE
router.delete('/:id',middleware.checkCampgroundOwnership,(req,res)=>{
	Campground.findByIdAndDelete(req.params.id,(err)=>{
		if(err){
			res.redirect('/campgrounds');
		}else{
			res.redirect('/campgrounds');
		}
	});
});


module.exports = router;