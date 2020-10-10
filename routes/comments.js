var express = require('express');
var router = express.Router({mergeParams : true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware')                  //it automatically requires index.js coz it is a special name

//====================
//COMMENT ROUTES
//====================

//NEW ROUTE
router.get('/new', middleware.isLoggedIn, (req,res)=>{
	Campground.findById(req.params.id,(err,foundCampground)=>{
		if(err){
			console.log(err);
		}else{
			res.render('comments/new',{campground:foundCampground});
		}
	});
});

//CREATE ROUTE
router.post('/', middleware.isLoggedIn, (req,res)=>{
	Campground.findById(req.params.id,(err,foundCampground)=>{
		if(err){
			console.log(err);
			res.redirect('/campgrounds');
		}else{
			Comment.create(req.body.comment,(err,comment)=>{
				if(err){
					req.flash('error','Something went wrong');
					console.log(err);
				}else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					foundCampground.comments.push(comment);
					foundCampground.save();
					req.flash('success','Successfully added comment');
					res.redirect('/campgrounds/'+req.params.id);
				}
			});
		}
	});
});

//EDIT ROUTE
router.get('/:comment_id/edit',middleware.checkCommentOwnership,(req,res)=>{
	Comment.findById(req.params.comment_id,(err,foundComment)=>{
		if(err || !foundComment){
			req.flash('error','Comment not found')
			res.redirect('back');
		}else{
			res.render('comments/edit',{campground_id : req.params.id, comment : foundComment});
		}
	});
});

//UPDATE ROUTE
router.put('/:comment_id',middleware.checkCommentOwnership,(req,res)=>{
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,updatedComment)=>{
		if(err){
			res.redirect('back');
		}else{
			res.redirect('/campgrounds/'+req.params.id);
		}
	});
});

//DELETE ROUTE
router.delete('/:comment_id',middleware.checkCommentOwnership,(req,res)=>{
	Comment.findByIdAndDelete(req.params.comment_id,(err)=>{
		if(err){
			res.redirect('back');
		}else{
			req.flash('success','Successfully deleted the comment')
			res.redirect('/campgrounds/'+req.params.id);
		}
	});
});



module.exports = router;