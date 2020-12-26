const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/dbTicket";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};
const User = require("../schemas/user");
var UserModel = null;

const addDefaultUsers = async userModel => {
  const user1 = new userModel({
    name: "employee",
    type: 1
  });
  await user1.save();

  const user2 = new userModel({
    name: "customer",
    type: 2
  });
  await user2.save();
};

router.use(async (req, res, next) => {
  await mongoose.connect(uri, options);
  UserModel = mongoose.model("User", User);
  next();
});

router.get("/list", async (req, res, next) => {
  var users = await UserModel.find();
  if (!users.length) {
    await addDefaultUsers(UserModel);
  }
  var users = await UserModel.find();
  res.send(users);
});

module.exports = router;
