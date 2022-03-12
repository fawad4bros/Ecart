const { User } = require("../models/user");

class UserController {
  constructor() {}

  userLogin = async (req, res) => {};

  userRegistration = async (req, res) => {};

  getUsers = async (req, res) => {
    const limit = Number(req.query.limit) || 0;
    const sort = req.query.sort === "desc" ? -1 : 1;
    try {
      const users = await User.find({}).limit(limit).sort({ username: sort });
      if (Object.keys(users).length === 0) {
        return res.status(404).json({ message: "Collection is empty" });
      }
      return res.status(200).json({ users: users });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong " + error,
      });
    }
  };

  getUser = async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      return res.status(200).json({ user: user });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong " + error,
      });
    }
  };

  addUser = async (req, res) => {
    try {
      const create = await User.create({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        name: {
          firstname: req.body.name.firstname,
          lastname: req.body.name.lastname,
        },
        address: {
          city: req.body.address.city,
          street: req.body.address.street,
          number: req.body.address.number,
          zipcode: req.body.address.zipcode,
        },
        phone: req.body.phone,
      });
      await create.save();
      return res.status(201).json({ message: "Successfully Created" });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong " + error });
    }
  };

  updateUser = async (req, res) => {
    try {
      const filter = { _id: req.params.id };
      const update = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        name: {
          firstname: req.body.name.firstname,
          lastname: req.body.name.lastname,
        },
        address: {
          city: req.body.address.city,
          street: req.body.address.street,
          number: req.body.address.number,
          zipcode: req.body.address.zipcode,
        },
        phone: req.body.phone,
      };
      const option = { new: true };
      await User.findOneAndUpdate(filter, update, option);
      return res.status(200).json({
        message: "User Successfully Updated",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong " + error,
      });
    }
  };

  deleteUser = async (req, res) => {
    try {
      await User.findOneAndRemove({ _id: req.params.id });
      return res.status(200).json({
        message: "User Successfully Deleted",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong " + error,
      });
    }
  };
}
module.exports = new UserController();
