const express = require('express');
const app = express();
const cors = require("cors");   
require('dotenv').config();    
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const errorMiddleWare = require("./middleware/error");


//Routes import
const blogRouter = require('./routes/blog-routes');
const carRouter = require('./routes/cars-routes');


//Middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());


//for corss origin permission
app.use(cors());
app.options('*', cors());


//for testing purpose
app.get(`/`, (req, res) => {
    res.json("Hii from api");
});



//Using Routers
app.use(`/api/v1/blogs`, blogRouter);
app.use(`/api/v1/cars`, carRouter);



//connecting to database
mongoose.connect(process.env.DB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((data) => {
    console.log("Database is ready....");
}).catch((err) => {
    console.log(err);
})





app.listen(port, (() => {
    console.log("server is wokring");
}));