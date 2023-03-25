const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    image: {
        type: String,
        require: true
    },

    metaData: {
        type: String,
        require: true
    },

    message: {
        type: String,
        require: true
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'Users'
    },

    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'commnets'
    }]
});

module.exports = mongoose.model("Feeds", feedSchema);