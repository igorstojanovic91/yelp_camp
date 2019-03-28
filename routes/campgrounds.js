var express = require("express"),
    router = express.Router(); //DO THIS to add the routes to express router and change all app.get/post to router.get /post. It is a new instance to express

var expressSanitizer = require("express-sanitizer");
var Campground = require("../models/campground"); //IMPORTING CAMPGROUND MODEL
var Comment = require("../models/comment"); //IMPORTING CAMPGROUND MODEL
var middleware = require("../middleware") //AUTOMATICALLY LOOKS FOR index.js

router.use(expressSanitizer()); //MUST BE AFTER BODY-PARSER


// ========================================================================================

//SHOW ALL CAMPGROUNDS
router.get("/", function(req, res) {
    //Get all campgrounds in MongoDB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) {
            console.log(err)
        } else {
            //Render new file
            res.render("campground/index", {campgrounds : allCampgrounds}) //checks if there is a current user
        }
    })
    
});

// LOGIC OF ADDING NEW CAMPGROUNDS
router.post("/", middleware.isLoggedIn, function(req, res) { // campgrounds are different routs when it used for get and post!! (REST Convention) // must bi middleware.isLoggedIN
    //get form from form and add to campgrounds arraay
    //redirect back to campgrounds (get) page
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = { //CREATING AN AUTHOR OBJECT
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name : name, image : image, description: description, price: price, author: author}; //ADDING AUTHOR OBJECT
    
    //Create new Campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err)
        } else {
            console.log("CAMPGROUND WAS SUCCESSFULLY ADDED TO DB");
            console.log(newlyCreated);
            res.redirect("/campgrounds") //By default it redirects to the get request and not POST request //in the views/campground directory

        }
    })
});

//FORM TO ADD NEW CAMPGROUND
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campground/new"); //in the views/campground directory
});

//SHOW MORE INFO ABOUT 1 CAMPGROUND
router.get("/:id", function(req, res) {
    //find campground with specific id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) { //includes comments to the campgrounds "populates" them before making a query
        if(err) {
            console.log(err)
        //show template with that campground
        } else {
            res.render("campground/show", {campground: foundCampground}); //in the views/campground directory
        }
    })
    
    
})

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership,function(req, res) {
    Campground.findById(req.params.id, function(err, editCampground) {
            if(err) {
                req.flash("error", "Couldn't find campground!");
                console.log(err);
            } else {
                res.render("campground/edit", {campground: editCampground});
        }
    })
})

//EDIT LOGIC 
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res) { //must be middleware.checkCampgroundOwnership
    req.body.campground.description = req.sanitize(req.body.campground.description);
    console.log(req.body.campground);
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateBlog) {
        if(err) {
            req.flash("error", "Couldn't find campground!");
            res.redirect("/:id/edit");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})


//DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findOneAndDelete(req.params.id, req.body.campground, function(err, removeCampground) {
        if(err) {
            req.flash("error", "Couldn't find campground!");
            res.redirect("/campgrounds");
        } else {
            Comment.deleteMany( {_id: { $in: removeCampground.comments} }, function(err, removeComments) {
                if(err) {
                    req.flash("error", "Couldn't delete the attached campground!");
                    console.log(err);
                } else {
                    req.flash("success", "Removed campground!")
                    res.redirect("/campgrounds");
                }
            })
            
        }
    })
})

module.exports = router; // WE NEED TO EXPORT SOMETHING OF THIS DOCUMENT, all routes are added to the instant of router



