# YelpCamp

* Add LAnding Page
* Add campgrounds page that lists all campgrounds

Each Campground has:
* Name
* Image

# Layout and Basic styling
* Create our header and footer partials
* Add in Bootstrap

# Creating new Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

# Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

# Style the navbar and form
* Add a navbar to all templates
* Style the new campgrounds form

# Add Mongoose
* Install and configure Mongoose
* Setup campground Model
* Use campground model inside of our routes!

# Show Page
* Review the RESTful routes we have seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template

# Refractor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly

# Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

# Add The Comment Model
* Make our errors go away
* Display comments on campground show page

# Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

# Style Show Page
* Add sidebar to show page
* Display comments nicely

# Finish Styling Show page
* Add public directory
* Add custom stylesheet 

# Auth pt. 1 - Add User Model
* Install all packages needed for auth
* Define user model

# Auth pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

# Auth pt. 3 - Login
* Add login routes
* Add login template

# Auth pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

# Auth pt. 5 - Show/Hide links
* Show/Hide auth links in navbar correctly

# Refractor the routes
* Use Express Router to reorganize all routes

# Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

# Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

# Editing Campground
* Add method-override
* Add edit route for campground
* Add link to edit page
* Add update route

# Deleting campgrounds
* Add delete route
* Add delete button

# Authorization Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

# Editing Comments
* Add edit route for comments
* Add edit button
* Add update route

# Deleting comments
* Add delete route
* Add delete button

# Authorization Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refractor Middleware

# Adding in Flash!
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header

# Style Landing page
* Make landing.css file in stylesheets
* Apply css to landing page

# Add Dynamic Price feature
* Add price to campground model as a String datatype
* Add price to views/campgrounds/new.ejs and views/campgrounds/edit.ejs (new and edit forms)
* Add price to views/camprounds/show.ejs (campground show page)