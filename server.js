const express = require("express");
const path = require("path");

const { json } = require("body-parser");
const dotenv = require("dotenv");

const connectDB = require("./backend/lib/config/db");
const app = express();

app.use(json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("/frontend/dist/frontend"));

require("./backend/app/product/routesDefinations/product.routeDefs")(app);
require("./backend/app/cart/routesDefinations/cart.routeDefs")(app);
require("./backend/app/user/routesDefinations/user.routeDefs")(app);

dotenv.config({ path: "./backend/.env" });

connectDB();
app.get("/*", (req, res) => {
  res.sendFile("index.html", {
    root: "/frontend/dist/frontend",
  });
});
const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server Up`);
});
