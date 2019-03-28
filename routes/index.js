var express = require("express"),
    router = express.Router(); //DO THIS to add the routes to express router and change all app.get/post to router.get /post. It is a new instance to express

var passport = require("passport");
var User = require("../models/user");


//ROUTE
router.get("/", function(req, res) {
    res.render("landing");
})

//AUTH ROUTES

//SIGN UP ROUTE
router.get("/register", function(req, res) {
    res.render("register");
})

// HANDLES SIGN UP LOGIC
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username}) //CREATING newUSer variable to make it cleaner
    User.register(newUser, req.body.password, function(err, user) { //CREATING FIRST A USER
        if(err) {
            req.flash("error", err.message);
            return res.redirect("register"); //RETURN gets out of the callback when we return
        } else {
            passport.authenticate("local")(req, res, function() { //LOGG THE USER IN
            req.flash("success", "Welcome " + user.username + "! Your account was successfully created!");
            res.redirect("/campgrounds")
            })
        }
    
    }) 
})

// LOGIN FORM
router.get("/login", function(req, res) {
    res.render("login"); //same key as in middleweare/index.js it is only called if we are redirected to /login from middleweare/index.js
})

//LOGIN LOGIC
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
    failureFlash: true
}), function(req, res) {
    
})

//LOGOUT
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out")
    res.redirect("/campgrounds")
})



module.exports = router; // WE NEED TO EXPORT SOMETHING OF THIS DOCUMENT, all routes are added to the instant of router