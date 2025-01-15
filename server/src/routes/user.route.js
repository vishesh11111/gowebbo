
const express = require("express");
const route = express.Router();


const User_controller = require("../controllers/user.controller");

route.post("/register", User_controller?.Register)
route.post("/login", User_controller?.login)


module.exports = route;