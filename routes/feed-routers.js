const Feed = require("../models/feed");
const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandler = require("../utils/errorhander");
const router = express.Router();

router.get(
  `/test`,
  catchAsyncErrors(async (req, res, next) => {
    res.send("Working under feed");
  })
);

router.post(
  `/`,
  catchAsyncErrors(async (req, res, next) => {
    let feed = new Feed({
      image: req.body.image,
      metaData: req.body.metaData,
      user: req.body.user,
      message: req.body.message,
    });

    feed = await feed.save();

    if (!feed) {
      return next(
        new Errorhandler("Something wrong happend while saving feed")
      );
    }

    res.status(201).json({
      success: true,
      feed,
    });
  })
);

router.get(
  `/`,
  catchAsyncErrors(async (req, res, next) => {
    const feeds = await Feed.find();

    if (!feeds) {
      return res.status(204).json({
        success: true,
        message: "No Content",
      });
    }

    res.status(200).json({
      success: true,
      feeds,
    });
  })
);

router.put(
  `/:id`,
  catchAsyncErrors(async (req, res, next) => {
    let feed = await Feed.findByIdAndUpdate(
      req.params.id,
      {
        image: req.body.image,
        metaData: req.body.metaData,
        message: req.body.message,
      },
      { new: true }
    );

    if (!feed) {
      return next(new Errorhandler("Feed not found", 404));
    }

    res.status(200).json({
      success: true,
      feed
    });
  })
);

router.delete(
  `/:id`,
  catchAsyncErrors(async (req, res, next) => {
    let feed = await Feed.findById(req.params.id);

    if (!feed) {
      return next(new Errorhandler("Feed not found", 404));
    }

    await feed.remove();

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  })
);

module.exports = router;
