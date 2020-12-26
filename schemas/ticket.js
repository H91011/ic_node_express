const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Ticket = new Schema({
  subject: {type: String, default: "", required: true},
  status: {type: Number, default: 1, required: true},
  body: {type: Array}
});

module.exports = Ticket;
