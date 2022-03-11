const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const { json } = require("body-parser");
const config = require("dotenv");

// const apis = require("./apis/api");
const connectDB = require("./lib/config/db");

const app = express();
app.use(json());

// app.use(apis);
require("./app/product/routesDefinations/product.routeDefs")(app);
require("./app/cart/routesDefinations/cart.routeDefs")(app);
require("./app/user/routesDefinations/user.routeDefs")(app);
app.use(express.static(path.join(__dirname, "public")));
config.config({ path: "./.env" });

if (process.env.NODE_ENV === "development") {
  morgan.token(
    "timed",
    "Method(:method) URL(:url) STATUS(:status) TIME (:total-time[2])"
  );
  let logStream = fs.createWriteStream(path.join(__dirname, "file.log"), {
    flags: "a",
  });
  app.use(morgan("timed", { stream: logStream }));
  app.use(morgan("timed"));
}
connectDB();
const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server Up`);
});
