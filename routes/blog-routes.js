const Blog = require("../models/blog");
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
    let blog = new Blog({
      image: req.body.image,
      user: req.body.user,
      message: req.body.message,
      metaData: req.body.metaData,
    });

    blog = await blog.save();

    if (!blog) {
      return next(
        new Errorhandler("Somethings woring happend while saving the blog", 404)
      );
    }

    res.status(201).json({
      success: true,
      blog,
    });
  })
);

router.get(
  `/`,
  catchAsyncErrors(async (req, res, next) => {
    const blogs = await Blog.find();

    if (!blogs) {
      return next(new Errorhandler("No Blogs found", 404));
    }

    res.status(201).json({
      success: true,
      blogs
    });
  })
);

router.get(
  `/:id`,
  catchAsyncErrors(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new Errorhandler("No blog is found with this Id"));
    }

    res.status(201).json({
      success: true,
      blog,
    });
  })
);

router.put(
  `/:id`,
  catchAsyncErrors(async (req, res, next) => {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        image: req.body.image,
        metaData: req.body.metaData,
        message: req.body.message,
      },
      { new: true }
    );

    if (!blog) {
      return next(
        new Errorhandler("Something wrong happend while updating the blog")
      );
    }

    res.status(201).json({
      success: true,
      blog
    });
  })
);

router.delete(
  `/:id`,
  catchAsyncErrors(async (req, res, next) => {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return next(new Errorhandler("No Blog found with given Blog Id", 404));
    }

    await blog.remove();

    res.status(201).json({
      success: true,
      message: "Successfully Deleted",
    });
  })
);

module.exports = router;
