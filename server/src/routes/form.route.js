
const express = require("express");
const route = express.Router();
const auth = require("../middlewares/auth");


const form_controller = require("../controllers/form.controller");

route.post("/create", auth, form_controller?.create)
route.patch("/update/:id", form_controller?.update)
route.get("/findById/:id", form_controller?.findOne)
route.get("/find", form_controller?.findAll)
route.delete("/delete/:id", auth, form_controller?.delete)



module.exports = route;