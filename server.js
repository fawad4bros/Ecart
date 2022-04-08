const express = require("express");
const path = require("path");
const passport = require("passport");
const cors = require("cors");
const { json } = require("body-parser");
const dotenv = require("dotenv");

const connectDB = require("./lib/config/db");
const app = express();

app.use(cors());
app.use(json());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("./dist/frontend"));
require("./app/middlewares/passport")(passport);
require("./app/product/routesDefinations/product.routeDefs")(app);
require("./app/cart/routesDefinations/cart.routeDefs")(app);
require("./app/user/routesDefinations/user.routeDefs")(app);

dotenv.config({ path: "./.env" });

connectDB();
app.get("/*", (req, res) => {
  res.sendFile("index.html", {
    root: "dist/frontend",
  });
});
const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server Up`);
});
