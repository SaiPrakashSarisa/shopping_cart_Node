const mysql = require("mysql");

require("dotenv").config();

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

// Create a connection to the mysql data base
const connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error Connectiong To MYSQL Data Base..", err);
    return;
  } else {
    console.log("<<<<<<<<<Connected to MYSQL DATABASE SUCESS>>>>>>");
  }
});

exports.addToCart = (cust_id, product_id, product) => {
  console.log(product);
  return new Promise((resolve, reject) => {
    connection.query(
      "select * from cart_items where cart_id = ? && product_id = ?",
      [cust_id, product_id],
      async (err, result) => {
        if (err) {
          reject(err);
        } else {
          if ((await result.length) === 0) {
            connection.query(
              "insert into cart_items (cart_id, product_id, quantity)values (?, ?, ?)",
              [cust_id, product_id, "1"],
              async (err, res) => {
                if (err) {
                  reject(err);
                } else {
                  console.log(res, "product is added");
                  resolve({
                    status: "sucess",
                    message: "Product added to Cart",
                  });
                }
              }
            );
          } else {
            connection.query(
              "update cart_items set quantity = ? where cart_id = ? && product_id = ?",
              [Number(result[0].quantity) + 1, cust_id, product_id],
              async (err, result) => {
                if (err) {
                  reject(err);
                } else {
                  console.log(
                    result,
                    " is the updated quantity of the product"
                  );
                  resolve({
                    status: "sucess",
                    message: "product quantity updated in cart",
                  });
                }
              }
            );
          }
        }
      }
    );
  });
};

exports.getCartItems = (cust_id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT ci.cart_item_id, ci.product_id, ci.quantity, " +
        "p.product_name, p.product_price, p.product_discount, p.product_quantity " +
        "FROM cart_items ci " +
        "JOIN products p ON ci.product_id = p.product_id " +
        "where ci.cart_id = ? ",
      [cust_id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            status: "sucess",
            data: result,
            message: "Cart Products data is fetched",
          });
        }
      }
    );
  });
};

exports.deleteCartItem = (product_id, cart_item_id, qty) => {
  // console.log(qty, cart_item_id, product_id);
  return new Promise((resolve, reject) => {
    if (qty != 1) {
      connection.query(
        "UPDATE cart_items SET quantity = ? where cart_item_id = ? &&  product_id = ?",
        [Number(qty) - 1, Number(cart_item_id), product_id],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              status: "sucess",
              data: res,
              message: "item removed from cart",
            });
          }
        }
      );
    } else {
      connection.query(
        "DELETE FROM cart_items WHERE cart_item_id = ? && product_id = ?",
        [Number(cart_item_id), product_id],
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              status: "sucess",
              data: res,
              message: "item removed from cart",
            });
          }
        }
      );
    }
  });
};
