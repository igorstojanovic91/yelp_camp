var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId, //USER ID 
            ref: "User" // STORED IN USER MODEL
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema)