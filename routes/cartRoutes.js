const express = require('express');
const cart = express.Router();

const cartController = require('../controllers/cartController');
const validator = require('../util/JsonWEBTokenValidator/validator');

cart.post('/addToCart', validator.validate, cartController.addToCart);
cart.get('/getCartItems', validator.validate, cartController.getCartItems);
cart.post('/deleteCartItem',  cartController.deleteCartItems);

module.exports = cart;