const express = require("express");
// const bodyParser = require("body-parser");
const { json } = require("body-parser");
const config = require("dotenv");

const apis = require("./apis/api");
const connectDB = require("./lib/config/db");

const app = express();
app.use(json()); //server can accept JSON data (req.body)
app.use(apis);
app.use("/image", express.static("./public/images"));
// app.use(bodyParser.urlencoded({ extended: true }));

config.config({ path: "./.env" });

connectDB();
const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log("Server Up");
});
