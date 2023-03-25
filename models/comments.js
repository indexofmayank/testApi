const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    commentData: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: "user"
    }
});

module.exports = mongoose.model("Comments", commentSchema);