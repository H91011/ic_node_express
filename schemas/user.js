const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema({
  name: {type: String, default: "", required: true},
  type: {type: Number, default: "", required: true}
});

module.exports = User;
