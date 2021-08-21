const mysql = require("mysql2");

//CONNECTING WITH DATABASE MYSQL
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

db.connect(function(err){
    if(!err){
        console.log("Sucessfully Connected");
    }
    else{
        console.log(err);
        console.log("NOt Connected");
    }
})
module.exports = db;