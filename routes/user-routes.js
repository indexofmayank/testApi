const User = require('../models/user');
const express = require('express');
const router = express.Router();
const catchAsyncError = require('../middleware/catchAsyncErrors');
const Errorhandler = require('../utils/errorhander');
const sendToken = require('../utils/jwtToken');

router.post(`/`, catchAsyncError( async(req, res, next) => {

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user = await user.save();

    if(!user){
        return next(new Errorhandler("Some Wrong happend while saving "));
    }


    sendToken(user, 201, res);

}));


router.get(`/logout`, catchAsyncError( async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(201).json({
        success: true,
        message: "Logged Out"
    });
}));


router.post(`/login`, catchAsyncError ( async (req, res, next) => {

    const { email, password } = req.body

    if(!email || !password) {
        return next (new Errorhandler("Please Enter Email and Password", 400));
    }

    let user = await User.findOne({ email }).select("+password");

    if(!user) {
        return next (new Errorhandler("Invalid email or password", 401));
    }

    let isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next (new Errorhandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);

}));

//todo
// router.post(`/password/forgot`, )

router.get(`/admin/users/:id`, catchAsyncError( async (req, res, next) => {
    const user = await User.findById(req.params.id);

    res.status(200).json({
        success: true,
        user,
    });     

}));

router.put(`/updatePassword/:id`, catchAsyncError ( async (req, res, next) => {
    const user = await User.findById(req.params.id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched) {
        return next (new Errorhandler("Old password is incorrect", 400));
    }

    user.password = req.body.newPassword;

    await user.save();
    sendToken(user, 200, res);
}));

//updateUserProfile // TODO
router.get(`/admin/users`, catchAsyncError ( async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    });
}));







router.get(`/admin/`, async ( req, res, next) => {
    res.send('working');
});



module.exports = router;