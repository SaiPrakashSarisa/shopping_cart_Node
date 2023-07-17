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

exports.getCustomers = (cust_Id) => {
  //   console.log("customer data is required fo r", cust_Id);
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM customers WHERE cust_Id = ?",
      [cust_Id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          //   console.log("Fetched Data : ", result);
          resolve(result);
        }
      }
    );
  });
};

exports.updateCustomer = (customer, cust_id) => {
  console.log(customer, cust_id);
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE customers SET custName = ?, email = ?, phone = ? WHERE cust_Id = ?",
      [customer.custName, customer.email, customer.phone, cust_id],
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

exports.findloggedUser = (emailORphone, password) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM customers WHERE (phone = ? OR email = ?) AND password = ?",
      [emailORphone, emailORphone, password],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          // console.log('Found User : ' , result);
          resolve(result);
        }
      }
    );
  });
};

exports.addAddress = (address, cust_id) => {
  // console.log(address, cust_id, 'inside queries');
  return new Promise((resolve, reject) => {
    connection.query(
      "insert into addresses (cust_Id, street, city, state, country, postal_code, house_number) values (?,?,?,?,?,?,?)",
      [
        cust_id,
        address.street,
        address.city,
        address.state,
        address.country,
        address.postalcode,
        address.houseNo,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve({ status: "sucess", data: result, message: "address added" });
        }
      }
    );
  });
};

exports.getAddresses = (cust_id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM addresses WHERE cust_Id = ?",
      [cust_id],
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

exports.deleteAddress = (address_id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM addresses WHERE address_Id=?",
      [address_id],
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

exports.orders = (cust_id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM orders WHERE cust_Id =? ",
      [cust_id],
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
