const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Ticket = new Schema({
  userId: {type: String, default: "", required: true},
  subject: {type: String, default: "", required: true},
  status: {type: String, default: "open", required: true},
  body: {type: Array}
});

module.exports = Ticket;
