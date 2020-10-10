require('dotenv').config();
var express				  = require('express'),
	app					  = express(),
	bodyParser			  = require('body-parser'),
	mongoose 			  = require('mongoose'),
	flash 			  	  = require('connect-flash'),
	expressSession		  = require('express-session'),
	passport 			  = require('passport'),
	LocalStrategy 		  = require('passport-local'),
	methodOverride		  = require('method-override'),
	Campground 			  = require('./models/campground'),
	Comment 			  = require('./models/comment'),
	User 			 	  = require('./models/user');
	// seedDB 				  = require('./seeds');

//requiring routes
var commentRoutes = require('./routes/comments'),
 	campgroundRoutes = require('./routes/campgrounds'),
	indexRoutes = require('./routes/index');

var port = process.env.PORT || 3000;
var url = process.env.DATABASEURL;

mongoose.connect(url, {
	useNewUrlParser: true,
	useFindAndModify: false,
	useCreateIndex: true,
	useUnifiedTopology: true
});
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static( __dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());    //before passport config

//PASSPORT CONFIG
app.use(expressSession({
	secret: 'This can be anything, only used for encoding and decoding process',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// seedDB();

app.use((req,res,next)=>{
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});

app.use('/',indexRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);

app.listen(port, function() {
	console.log('Serving YelpCamp on port 3000');
});
