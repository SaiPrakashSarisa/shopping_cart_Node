const mysql = require('mysql');

require('dotenv').config();

const idGenerator = require('../ID_GENERATORS/customer_id');

const host = process.env.MYSQL_HOST;
const user = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const database = process.env.MYSQL_DATABASE;

// establishing connection
const connection = mysql.createConnection({
    host : host,
    user : user,
    password : password,
    database : database
})

connection.connect((err) =>{
    if(err){
        console.error('Error Connectiong To MYSQL Data Base..', err);
        return;
    }else{
        console.log('<<<<<<<<<Connected to MYSQL DATABASE SUCESS>>>>>>');
    }
})

exports.registerUser = (userName, email, phone, password) => {
    let id = idGenerator.generteCustomerId();
    console.log({id, userName, email, phone, password});

    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO customers VALUES(?,?,?,?,?)', [id, userName, email, phone, password], (err, result) => {
            if(err){
                reject(err);
            }else{
                console.log(result);
                resolve(result);
            }
        });
    });
};