const express = require('express');
const app = express();



app.get(`/`, (req, res) => {
    res.json("Hii from api");
});

app.listen(5000, (() => {
    console.log("server is wokring");
}))