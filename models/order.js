const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },

    startDate: {
        type: String,
        required: true
    },

    endDate: {
        type: String,
        required: true
    },

    totalDays: {
        type: String,
        required: true
    },

    totalPrice: {
        type: String,
        required: true
    },

    fixedPrice: {
        type: String,
        required: true
    },

    car: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Car'
    },

    customer: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    isPayNow: {
        type: Boolean,
        default: false
    },

    status: {
        type: String,
        required: true,
        default: 'Pending'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }


});


module.exports = mongoose.model('Order', orderSchema);