const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "No authorization provided" });
    }
    let token = req.headers.authorization.split(" ")[1]; //0[Bearer],1[header.payload.signature]
    if (token === "null") {
      return res.status(401).json({ message: "Authorization empty" });
    }
    let payload = jwt.verify(token, process.env.SECRETKEY);
    if (!payload) {
      return res
        .status(401)
        .json({ message: "You are unauthorized for this request" });
    }
    req.userId = payload.subject;
    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
