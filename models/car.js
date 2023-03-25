const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
   license_number:{
    type: String,
    require: true
   },

   stock_number: {
    type: Number,
    require: true
   },

   passenger_capacity:{
    type: Number,
    require: true
   },

   has_sunroof:{
    type: Boolean,
    require: true
   },

   model:{
   type: String,
   require: true
   },

   brand: {
    type: String,
    require: true
   },

   manufacturing_year:{
    type: Number,
    require: true
   },

   mileage:{
    type: Number,
    require: true
   },

   total_run: {
      type: Number,
      require: true
   },

   transmission_type: {
      type: String,
      require: true
   },

   isFeatured: {
      type: Boolean,
      require: true
   },

   image: {
      type: String,
      require: true
   },

   images: [{
      type: String
   }]

});

exports.Car = mongoose.model('Car', carSchema);
exports.carSchema = carSchema;