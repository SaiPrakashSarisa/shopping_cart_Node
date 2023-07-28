const mysql = require("mysql");

require("dotenv").config();

const idGenerator = require("../ID_GENERATORS/customer_id");
const date_time = require("../date_time");

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

// establishing connection
const connection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});

connection.connect((err) => {
  if (err) {
    console.error("Error Connectiong To MYSQL Data Base..", err);
    return;
  } else {
    console.log("<<<<<<<<<Connected to MYSQL DATABASE SUCESS>>>>>>");
  }
});

exports.products = () => {
  return new Promise((resolve, reject) => {
    connection.query("select * from products", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.productImages = () => {
  return new Promise((resolve, reject) => {
    connection.query("select * from images", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.selectedPorduct = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM products p JOIN images i ON p.product_id = i.product_id where p.product_id = ?",
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

// adding order details to order table.
exports.addOrders = (product_id, cust_id, qty) => {
  console.log("my product id is ", product_id);
  const dtd = date_time.getDateTime();
  const date = dtd[0];
  const time = dtd[1];
  const day = dtd[2];

  return new Promise((resolve, reject) => {
    connection.query(
      "insert into orders (product_id, cust_Id, quantity, date, time, day) values (?, ?, ?, ?, ?, ?)",
      [product_id, cust_id, qty, date, time, day],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
