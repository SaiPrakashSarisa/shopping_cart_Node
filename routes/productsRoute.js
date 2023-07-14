const express = require('express');
const products = express.Router();

const validator = require('../util/JsonWEBTokenValidator/validator');
const productsController = require('../controllers/productsController');


products.get('/allProducts', productsController.products);
products.post('/product',  productsController.product);

module.exports = products;