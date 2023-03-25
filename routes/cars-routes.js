const {Car} = require('../models/car');
const express = require('express');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandler = require('../utils/errorhander');
const router = express.Router();
const { default: mongoose } = require('mongoose');


router.get('/test', async(req, res) => {
    res.send('Hii From Cars-Routes');
});

router.post(
  "/car",
  uploadOptions.single("image"),
  catchAsyncErrors(async (req, res) => {

    const file = req.file;
    if(!file){
        return next (new Errorhandler("Please upload an image"));
    }

    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}`;

    let car = new Car({
      license_number: req.body.license_number,
      stock_number: req.body.stock_number,
      passenger_capcity: req.body.passenger_capcity,
      has_sunroof: req.body.has_sunroof,
      model: req.body.model,
      brand: req.body.brand,
      manufacturing_year: req.body.manufacturing_year,
      mileage: req.body.mileage,
      total_run: req.body.total_run,
      transmission_type: req.body.transmission_type,
      isFeatured: req.body.isFeatured,
      image: `${basePath}/${fileName}`
    });

    car = await car.save();

    if (!car) {
      return next(new Errorhandler("Something wrong happend"));
    }

    res.status(201).json({
      success: true,
      car,
    });
  })
);





router.get(`/`, async (req, res) => {
    const cars = await Car.find();

    if(!cars) {
        return res.status(204).json({
            success: false,
            message: 'No Content '
        });
    }

    res.status(200).json({
        success: true,
        cars
    });
});


router.get(`/:id`, catchAsyncErrors(async (req, res, next) => {
    const car = await Car.findById(req.params.id);

    if(!car) {
        return next (new Errorhandler("Car not found", 404));
    }

    res.status(200).json({
        success: true,
        car
    });
}));


router.put(`/:id`, catchAsyncErrors( async (req, res, next) => {
    
    let car = await Car.findByIdAndUpdate(
        req.params.id,
        {
            license_number: req.body.license_number,
            stock_number: req.body.stock_number,
            passenger_capcity: req.body.passenger_capcity,
            has_sunroof: req.body.has_sunroof,
            model: req.body.model,
            brand: req.body.brand,
            manufacturing_year: req.body.manufacturing_year,
            mileage: req.body.mileage,
            total_run: req.body.total_run,
            transmission_type: req.body.transmission_type,
            isFeatured: req.params.isFeatured
        },
        {new: true}
    );

    if(!car) {
        return next(new Errorhandler("Car not found", 404));
    }

    res.status(202).json({
        success: true,
        car
    });

}));

router.delete(`/:id`, catchAsyncErrors ( async (req, res, next) => {

    let car = await Car.findById(req.params.id);

    if(!car) {
        return next(new Errorhandler("Car not Found", 404));
    }

    await car.remove();

    res.status(200).json({
        success: true,
        message: 'Successfully deleted'
    });

}));

router.put(
  `/gallery-images/:id`,
  uploadOptions.array("image", 10),
  catchAsyncErrors(async (req, res, next) => {

    if(!mongoose.isValidObjectId(req.params.id)){
        return res.send(400).send('Invalid Product id');
    }

    const files = req.files;
    let imagePaths = [];
    const basePath = `${req.protocol}://${req.get('host')}`;

    if(files){
        files.map(file => {
            imagePaths.push(`${basePath}/${fileName}`);
        });
    }

    const car = await Car.findByIdAndUpdate(req.params.id,
        req.params.id,
        {
            images: imagePaths
        },
        {new: true}
    );
    
    if(!car){
        return next(new Errorhandler('Some issue'));
    }

    res.send(201).json({
        success: true,
        car
    });


  })
);


module.exports = router;
