const express = require("express");
const auth = express.Router();

const authContoller = require("../controllers/authController");
const validator = require("../util/JsonWEBTokenValidator/validator");

auth.post("/signUp", authContoller.signup);
auth.get("/customers", validator.validate, authContoller.getCustomers);
auth.post("/login", authContoller.login);
auth.post("/addaddress", validator.validate, authContoller.addAddress);
auth.get("/addresses", validator.validate, authContoller.getAddresses);
auth.post("/deleteaddress", validator.validate, authContoller.deleteAddress);
auth.post("/placeorder", validator.validate, authContoller.orderItems);

module.exports = auth;
