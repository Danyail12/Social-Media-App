const express = require('express');
const app = express();
const cookie_parser = require('cookie-parser');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());

if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"});
}


const post = require("./routes/post");
const user = require("./routes/user");
// const { parse } = require('dotenv');
// const { parse }  = require('dotenv');

app.use("/api/v1/",post);
app.use("/api/v1/",user);
module.exports = app;