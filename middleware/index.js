// all the middleware
var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, editCampground) {
            if(err) {
                req.flash("error", "Something went wrong");
                res.redirect("back");
            } else {
                // Added this block, to check if foundCampground exists, and if it doesn't to throw an error via connect-flash and send us back to the homepage
                if (!editCampground) {
                        req.flash("error", "Item not found.");
                        return res.redirect("back");
                    }
                // If the upper condition is true this will break out of the middleware and prevent the code below to crash our application
                    if(editCampground.author.id.equals(req.user._id)) { //needs to be equals because "===" does not work as it comapres Object and String
                        next();
                    } else {
                        req.flash("error", "You don't have permission to do that");
                        res.redirect("back"); //redirects back where the user came from
                    }
                }
        })
    } else {
         req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, editComment) {
            if(err) {
                req.flash("error", "Couldn't find the Campground");
                res.redirect("back");
            } else {
                if(editComment.author.id.equals(req.user._id)) { //needs to be equals because "===" does not work as it comapres Object and String
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back"); //redirects back where the user came from
                }
            }
        })
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) { //check if somebody is logged in
    if(req.isAuthenticated()) {
        return next();
    } else {
        //does not display anything, just gives us the possibility to accesss in the next page -> MUST BE BEFORE WE REDIRECT
        req.flash("error", "You need to be logged in to do that!") // key "error" is used to determine if message is green or red -> Is not desplayed to the next thing we see (/login)
        res.redirect("/login")
    }
}



module.exports = middlewareObj;