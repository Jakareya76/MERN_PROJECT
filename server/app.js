const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();


app.use(cookieParser());

// config
dotenv.config({path : "./config.env"});
require("./db/conn");

// JSON Middleware
app.use(express.json());

// user Schema
const User = require("./model/userSchema");

// router 
app.use(require("./router/auth"));

const PORT = process.env.PORT;



app.get("/singin" , (req , res)=>{
    res.send("Hello World from the Login page")
})
app.get("/singup" , (req , res)=>{
    res.send("Hello World from the SingUp page")
})

app.listen(PORT, ()=>{
    console.log(`Express Server is Runing on ${PORT}`)
})