const Comment = require("../models/comments");
const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandler = require("../utils/errorhander");
const router = express.Router();

router.get(
  `/test`,
  catchAsyncErrors(async (req, res, next) => {
    res.send("working");
  })
);

router.post(
  `/`,
  catchAsyncErrors(async (req, res, next) => {
    let comment = new Comment({
      name: req.body.name,
      commentData: req.body.commentData,
    });

    comment = await comment.save();

    if (!comment) {
      return next(
        new Errorhandler("Something wrong happend while saving comment")
      );
    }

    res.status(201).json({
      success: true,
      comment
    });
  })
);

router.get(
  `/`,
  catchAsyncErrors(async (req, res, next) => {
    const commentList = await Comment.find();

    if (!commentList) {
      return res.status(204).json({
        success: false,
        message: "No Content",
      });
    }

    res.status(200).json({
      success: true,
      commentList,
    });
  })
);

router.get(
  `/:id`,
  catchAsyncErrors(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(new Errorhandler("Comment not found", 404));
    }

    res.status(200).json({
      success: true,
      comment
    });
  })
);

router.put(
  `/:id`,
  catchAsyncErrors(async (req, res, next) => {
    let comment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        commentData: req.body.commentData,
      },
      { new: true }
    );

    if (!comment) {
      return next(new Errorhandler("Comment not found", 404));
    }

    res.status(200).json({
      success: true,
      comment
    });
  })
);

router.delete(
  `/:id`,
  catchAsyncErrors(async (req, res, next) => {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
      return next(new Errorhandler("Comment not found", 404));
    }

    await comment.remove();

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  })
);

module.exports = router;
