var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");


var data = [
    {
    name: "Nunu Campground",
    image: "https://campone.com/wp-content/uploads/2017/12/FB_IMG_1537891494422.jpg",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
    }, 
    {
    name: "Igor Campground",
    image: "https://i1.wp.com/visitmckenzieriver.com/oregon/wp-content/uploads/2015/06/paradise_campground.jpg?resize=250%2C250",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
    },
    {
    name: "Mi Campground",
    image: "https://i0.wp.com/visitmckenzieriver.com/oregon/wp-content/uploads/2014/11/TrailBridge.jpg?resize=250%2C250",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
    }
    
    ]

function seedDB() {
    //REMOVE ALL CAMPGROUNDS
    Campground.deleteMany({}, function(err) {
        if(err) {
            console.log(err)
        } else {
//            console.log("ALL REMOVED FROM DB CAMPGROUND");
//            // ADD A FEW CAMPGROUNDS
//            data.forEach(function(seed) {
//            Campground.create(seed, function(err, campground) {
//            if(err) {
//                console.log(err);
//            } else {
//                console.log(data + " added to db");
//                // ADD A FEW COMMENTS
//                Comment.create(
//                    {
//                        text: "This place is great, but i wish tehre was internet",
//                        author: "Homer"
//                    }, function(err, comment) {
//                        if(err) {
//                            console.log(err)
//                        } else {
//                            campground.comments.push(comment);
//                            campground.save();
//                            console.log("Created new comment");
//                        }
//                    })
//                }
//            })
//            })
                }
            })
    
}

module.exports = seedDB; // sends this function our to app js