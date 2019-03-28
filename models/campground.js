var mongoose = require('mongoose');

//Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: String,
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
        }
    ], // Comments property is an array of comment ids; ASssociate it with a campground
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }, 
        username: String
    }
})

//Compile to a model
module.exports = mongoose.model("Campground", campgroundSchema);