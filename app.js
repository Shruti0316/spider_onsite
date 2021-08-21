const express = require("express");
const ejs = require("ejs");
//.ENV FILE
require('dotenv').config()

//INITIALIZE APP
const app = express();

app.set("view-engine","ejs");

app.use(express.urlencoded({ extended: false }));

app.use('/public', express.static('public'));

//SETTING ROUTES
app.use("/", require("./routes/user"));

//LISTENING TO PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, (req, res) => {
  console.log(`http://localhost:${PORT}`);
});