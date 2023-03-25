const Order = require("../models/order");
const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Errorhandler = require("../utils/errorhander");
const { Car } = require("../models/car");

router.post(
  `/`,
  catchAsyncErrors(async (req, res, next) => {
    const car = await Car.findById(req.body.car);
    if (!car) {
      return next(new Errorhandler("Invalid Car", 500));
    }

    let order = new Order({
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      totalDays: req.body.totalDays,
      totalPrice: req.body.totalPrice,
      fixedPrice: req.body.fixedPrice,
      car: req.body.car,
      customer: req.user._id,
    });

    order = await order.save();

    if (!order) {
      return next(
        new Errorhandler("Something wrong happend while saving order", 400)
      );
    }

    res.status(201).json({
      success: true,
      order,
    });
  })
);

router.get(
  `/`,
  catchAsyncErrors(async (req, res, next) => {
   const orders = await Order.find();

    if (!orders) {
      return next(new Errorhandler("No order is found", 400));
    }

    res.status(200).json({
      success: true,
      orders,
    });
  })
);

//get single order
router.get(
  `/:id`,
  catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params._id);

    if (!order) {
      return next(
        new Errorhandler(" No order is find with given order Id", 404)
      );
    }

    res.status(200).json({
      success: true,
      order,
    });
  })
);

router.delete(
  `/:id`,
  catchAsyncErrors(async (req, res, next) => {
    let order = await Order.findById(req.params.id);
    if (!order) {
      return next(new Errorhandler("No Bookings is found with given id", 404));
    }

    await order.remove();

    res.status(201).json({
      success: true,
      message: "Successfully deleted",
    });
  })
);

router.get(
  `/`,
  catchAsyncErrors(async (req, res, next) => {
    res.send("Workingn from order-routers");
  })
);

module.exports = router;
