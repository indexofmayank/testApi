const express = require('express');
const app = express();



app.get(`/api/v1`, (req, res) => {
    res.json("Hii from api");
});

app.listen(3000, (() => {
    console.log("server is wokring");
}))