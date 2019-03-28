var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"), //needs to be before passport
    passport    = require("passport"),
    localStrategy = require("passport-local"),
    Campground  = require("./models/campground"), //.js is explicit
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride = require("method-override"),
    seedDB      = require("./seeds"); //here function seedDB() is stored from seeds.js
    
//IMPORTING ALL ROUTES
var campgroundRoutes    = require("./routes/campgrounds"), 
    commentRoutes       = require("./routes/comments"),
    indexRoutes         = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_camp_12", {useNewUrlParser: true}); //runs and tries to find /cat_app, if it doesn't find it, it creates one
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public")); //use this in the future!!
app.use(methodOverride("_method")); //needs to be specified to use put and delete 
app.use(expressSanitizer()); //MUST BE AFTER BODY-PARSER
app.set("view engine", "ejs");
//seedDB(); //seed the db
app.use(flash()); //needs to be to run flash

//PASSPORT CONFIG =============================================================================
app.use(require("express-session")({
    secret: "Nunu is the best",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next) { //THIS IS A MIDDLEWARE TO CHECK ON EVERY SITE IF A USER IS LOGGED IN OR NOT, IS CALLED ON EVERY ROUTE
    res.locals.currentUser = req.user; //this puts it in every template
    res.locals.error = req.flash("error"); // if there is anything in the flash we will have access to it under error
    res.locals.success = req.flash("success"); // if there is anything in the flash we will have access to it under success
    next(); //VERY IMPORTANT; DOES NOT WORK WITHOUT NEXT
})

//TELL OUR APP TO USE THE ROUTES
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes); //SAYS THAT ALL ROUTES IN CAMPGROUNDROUTES START WITH /campgrounds , so it can be removed in campground.js
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp has started!")
});


