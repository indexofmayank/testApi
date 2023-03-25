const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    image: {
        type: String,
        require: true,
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    isMyFavourite: {
        type: Boolean,
        default: false
    },

    message: {
        type: String,
        require: true,
    },

    metaData: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model("Blogs", blogSchema);