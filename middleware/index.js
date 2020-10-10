//all middleware goes here
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('error','You need to be logged in to do that');    //always pass flash msg in key and value before redirecting
	res.redirect('/login');						//and then handle on the template 
}

middlewareObj.checkCampgroundOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,(err,foundCampground)=>{
			if(err || !foundCampground){
				req.flash('error','Campground not found');
				res.redirect('/campgrounds/'+req.params.id);
			}else{
				//foundCampground.author.id is mongoose object
				//req.user._id is string
				//so they cant be compared using === or ==
				if(foundCampground.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash('error','You dont have permission to do that');
					res.redirect('/campgrounds/'+req.params.id);
				}
			}
		});
	}else{
		req.flash('error','You need to login first');
		res.redirect('back');
	}
}

middlewareObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,(err,foundComment)=>{
			if(err || !foundComment){
				req.flash('error','Comment not found');
				res.redirect('back');
			}else{
				//foundComment.author.id is mongoose object
				//req.user._id is string
				//so they cant be compared using === or ==
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash('error','You dont have permission to do that');
					res.redirect('back');
				}
			}
		});
	}else{
		req.flash('error','You need to login first');
		res.redirect('back');
	}
}

module.exports = middlewareObj;