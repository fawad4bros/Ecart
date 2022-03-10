const cartRoute = require("../routes/cart.route");

module.exports = function (app) {
  app.use("/api/cart", cartRoute);
};
