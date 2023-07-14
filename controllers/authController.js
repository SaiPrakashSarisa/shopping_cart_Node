const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const register = require("../util/MYSQL_QUERIES/register_customer");
const customers = require("../util/MYSQL_QUERIES/get_customers");
const prodQueries = require("../util/MYSQL_QUERIES/get_products");

// register user
exports.signup = [
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  async (req, res) => {
    console.log("Inside sign up controller");

    const { userName, email, phone, password } = req.body;

    console.log({ userName, email, phone, password });
    try {
      const result = await register.registerUser(
        userName,
        email,
        phone,
        password
      );
      res.status(200).json(result);
    } catch (err) {
      console.error("Error", err);
    }
  },
];

// login user
exports.login = [
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  async (req, res) => {
    // console.log(req.body);
    const { emailORphone, password } = req.body;

    try {
      const loggedUser = await customers.findloggedUser(emailORphone, password);
      // console.log(loggedUser);
      if (loggedUser.length === 0) {
        res.status(401).send("Invalid user!!!");
      } else {
        const access_token_key = process.env.ACCESS_TOKEN_SECRET;
        const refresh_token_key = process.env.REFRESH_TOKEN_SECRET;

        const payload = {
          cust_Id: loggedUser[0].cust_Id,
          custName: loggedUser[0].custName,
          email: loggedUser[0].email,
          phone: loggedUser[0].phone,
        };

        // CREATING ACCESS_TOKEN
        const accessToken = jwt.sign(payload, access_token_key, {
          expiresIn: "30min",
        });

        //CREATING REFRESH_TOKEN
        const refreshToken = jwt.sign(payload, refresh_token_key, {
          expiresIn: "2hr",
        });
        res.status(200).json({
          accessToken,
          refreshToken,
          expiresIn: "30min",
        });
      }
    } catch (error) {
      console.error("Error", error);
    }
  },
];
// fetch customers data
exports.getCustomers = async (req, res) => {
  try {
    const customersData = await customers.getCustomers();
    console.log("customers are : ", customersData);
    res.status(200).send(customersData);
  } catch (error) {
    console.error("Error", error);
  }
};

exports.addAddress = [
  bodyParser.json(),
  async (req, res) => {
    // console.log(req.body);
    const address = {
      houseNo: req.body.houseNo,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      postalcode: req.body.postalcode,
    };

    const cust_id = req.cust_id;

    const result = await customers.addAddress(address, cust_id);
    res.status(200).json(result);
  },
];

exports.getAddresses = async (req, res) => {
  const cust_id = req.cust_id;
  const result = await customers.getAddresses(cust_id);
  res.status(200).json({
    status: "sucess",
    addresses: result,
    message: "fetched all addresses",
  });
};

exports.deleteAddress = [
  bodyParser.json(),
  async (req, res) => {
    console.log(req.body.address_id);
    const address_id = req.body.address_id;
    const result = await customers.deleteAddress(address_id);
    res.status(200).json({
      status: "sucess",
      data: result,
      message: "address deleted",
    });
  },
];

exports.orderItems = [
  bodyParser.json({ limit: "2mb" }),
  async (req, res) => {
    const products = req.body.products;
    const cust_id = req.cust_id;
    // console.log(products);

    // adding orders to oreders table
    const results = await Promise.all(
      products.map((product) => {
        return prodQueries.addOrders(
          product.product_id,
          cust_id,
          product.cart_item_quantity
        );
      })
    );

    // updating cart items
    const result = await Promise.all(
      products.map((product) => {
        return prodQueries.reduceProductQuantity(
          product.product_id,
          product.product_quantity,
          product.cart_item_quantity
        );
      })
    );

    // removing purchased cart items
    const cartResults = await Promise.all(
      products.map((product) => {
        return prodQueries.removeOrderedItems(product.cart_item_id, cust_id);
      })
    );

    console.log(results, `order table status`);
    console.log(result, "product quantity update status");
    console.log(cartResults, "cart items removed status");
    res.status(200).json({
      orderResult: results,
      productResult: result,
      cartResult: cartResults,
    });
  },
];