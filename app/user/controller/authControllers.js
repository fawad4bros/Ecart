const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require("bcryptjs");
class AuthController {
  constructor() {}
  // registration functionality
  userRegister = async (req, role, res) => {
    console.log("role", role);
    try {
      let { username, email, password } = req.body;
      let userNameTaken = await this.checkUserNameExists(username);
      if (userNameTaken) {
        return res.status(400).json({
          message: "Username already taken",
        });
      }
      let emailTaken = await this.checkUserEmailExists(email);
      if (emailTaken) {
        return res.status(400).json({
          message: "Email already registered",
        });
      }
      let hashingPassword = await bcrypt.hash(password, 12);
      await User.create({
        email: email,
        username: username,
        password: hashingPassword,
        role: role,
      });
      return res.status(201).json({ message: "Successfully Registered" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  checkUserNameExists = async (username) => {
    let userNameExists = await User.findOne({ username });
    return userNameExists ? true : false;
  };
  checkUserEmailExists = async (email) => {
    let userEmailExists = await User.findOne({ email });
    return userEmailExists ? true : false;
  };
  // Login functionality
  userLogin = async (req, role, res) => {
    let { email, password } = req.body;
    let user = await await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid email ",
      });
    }
    if (user.role != role) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          user_id: user._id,
          role: user.role,
          username: user.username,
          email: user.email,
        },
        process.env.SECRETKEY,
        {
          expiresIn: "1h",
        }
      );
      let result = {
        user_id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
        token: `Bearer ${token}`,
        expiresIn: "1h",
      };
      return res.status(200).json({
        ...result,
        message: "Successfully LoggedIn",
      });
    } else {
      return res.status(403).json({
        message: "Incorrect password",
      });
    }
  };

  userAuth = passport.authenticate("jwt", { session: false });
  // use serializeUser function to send the desired fields in the res object
  // AuthController.serializeUser(req.user)
  serializeUser = (user) => {
    return {
      username: user.username,
      email: user.email,
      _id: user._id,
    };
  };
  checkRole = (roles) => (req, res, next) =>
    !roles.includes(req.user.role)
      ? res.status(401).json({ message: "Unauthorized" })
      : next();
}
module.exports = new AuthController();
