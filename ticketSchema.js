const mongoose = require("mongoose");
const conn = require("./connMongo");
const Schema = mongoose.Schema;

const Ticket = new Schema({
  subject: String,
  status: Number,
  body: [
    {
      user: String,
      msg: String
    }
  ]
});

const TicketModel = conn.model("Ticket", Ticket);
module.exports = TicketModel;
