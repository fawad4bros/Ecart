const productRoute = require("../routes/product.route");

module.exports = function (app) {
  app.use("/api/product", productRoute);
};
