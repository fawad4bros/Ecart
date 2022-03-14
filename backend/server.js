const express = require("express");
const path = require("path");

const { json } = require("body-parser");
const dotenv = require("dotenv");

const connectDB = require("./lib/config/db");
const app = express();

app.use(json());
app.use(express.static(path.join(__dirname, "public")));

require("./app/product/routesDefinations/product.routeDefs")(app);
require("./app/cart/routesDefinations/cart.routeDefs")(app);
require("./app/user/routesDefinations/user.routeDefs")(app);

dotenv.config({ path: "./.env" });

connectDB();

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server Up`);
});