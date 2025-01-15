
const express = require("express");
const route = express.Router();
const auth = require("../middlewares/auth");


const form_submission_controller = require("../controllers/submitform.controller");

route.post("/create/:form_id", auth, form_submission_controller?.create)
// route.patch("/update/:id", auth, form_controller?.update)
// route.get("/findById/:id", auth, form_controller?.update)
// route.get("/find", auth, form_controller?.update)
route.delete("/delete/:id", auth, form_submission_controller?.delete)




module.exports = route;