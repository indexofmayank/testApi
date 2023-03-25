const express = require('express');
const app = express();
const cors = require("cors");       
const port = process.env.PORT || 3000;


app.use(cors());

app.get(`/`, (req, res) => {
    res.json("Hii from api");
});

app.get(`/api/v1`, (req, res) => {
    res.json("Hii from /api/v1");
})

app.listen(port, (() => {
    console.log("server is wokring");
}));