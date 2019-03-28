var express = require("express"),
    router = express.Router({mergeParams: true}); //mergeParams: true merges params from comment rountes and campground routes
    //DO THIS to add the routes to express router and change all app.get/post to router.get /post. It is a new instance to express

var Campground  = require("../models/campground"); //IMPORTING CAMPGROUND MODEL
var Comment     = require("../models/comment") // IMPORTING COMMENT MODEL
var middleware = require("../middleware") //AUTOMATICALLY LOOKS FOR index.js


// ============================
// COMMENTS ROUTES
// ============================

//Comments NEW
router.get("/new", middleware.isLoggedIn, function(req, res) { //with middleware only logged in users can sign in
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            req.flash("error", "Something went wrong!");
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground}); //in the views/comments directory
        }
    })
})

//COMMENT CREATE
router.post("/", middleware.isLoggedIn, function(req, res) { //prevents people to not send a post request here if they are not logged in
    //lookup campground using id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
         } else {
             //Create new comment
             Comment.create(req.body.comment, function(err, comment) {
                 if(err) {
                     console.log(err);
                 } else {
                     //add username and id to comment
                     comment.author.id = req.user._id; 
                     comment.author.username = req.user.username;
                     
                     //save comment
                     comment.save();
                     campground.comments.push(comment); //refers to the campground found
                     campground.save();
                     req.flash("success", "Your comment was added successfully");
                     res.redirect("/campgrounds/" + campground._id); //redirects it to the right route of the page
                }
            }) 
        }
    })
})


//EDIT COMMENT
router.get("/:comments_id/edit", middleware.checkCommentOwnership, function(req, res) { //id is defined in app.js, comments_id here
    Comment.findById(req.params.comments_id, function(err, foundComment) { //SEARCH THE COMMENT WITH THE ID
        if(err) {
            req.flash("error", "Something went wrong");
            res.redirect("back")
        } else {
            console.log(foundComment);
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment}) //PASS CAMPING ID FOR URL AND FOUND COMMENT
        }
    })
})

//UPDATE COMMENT
router.put("/:comments_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comments_id, req.body.comment, function(err, updateComment) {
        if(err) {
            req.flash("error", "Something went wrong");
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    } )

})

//DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndDelete(req.params.comment_id, function(err, removeComment) {
        if(err) {
            req.flash("error", "Something went wrong!");
            console.log(err);
            res.redirect("back");
        } else {
            console.log("SUCCESS");
            res.flash("success", "Your Comment was deleted successfully!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

module.exports = router; // WE NEED TO EXPORT SOMETHING OF THIS DOCUMENT, all routes are added to the instant of router

//middleweare


