const authController = require("../controllers/authController");
const productController = require("../controllers/productsController");
const cartController = require("../controllers/cartController");

// validator function
const { validate } = require("../util/JsonWEBTokenValidator/validator");

module.exports = function (app, router) {
  // signUp API
  app.route("/signUp").post(authController.signup);
  // login API
  app.route("/login").post(authController.login);
  // refresh API
  app.route("/refresh").post(authController.refreshToken);
  // allProducts API
  app.route("/allProducts").get(productController.products);
  // product API
  app.route("/product").post(productController.product);
  //addToCart API
  app.route("/addToCart").post(validate, cartController.addToCart);
  // getCartItems API
  app.route("/getCartItems").get(validate, cartController.getCartItems);
  // deleteCartItems
  app.route("/deletCartItems").post(validate, cartController.deleteCartItems);
  // addresses API
  app.route("/addresses").get(validate, authController.getAddresses);
  // addaddress API
  app.route("/addaddress").post(validate, authController.addAddress);
  // deleteaddress API
  app.route("/deleteaddress").post(validate, authController.deleteAddress);
  // updateAddress API
  app.route("/updateAddress").post(validate, authController.updateAddress);
  // placeorder API
  app.route("/placeorder").post(validate, authController.orderItems);
  // orders API
  app.route("/orders").get(validate, authController.orders);
  // customers API
  app.route("/customer").get(validate, authController.getCustomers);
  // updateCustomer API
  app.route("/updateCustomer").post(validate, authController.updateCutomer);
};
