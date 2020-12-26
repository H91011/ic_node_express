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
const Ticket = require("../schemas/ticket");
var TicketModel = null;

router.use(async (req, res, next) => {
  await mongoose.connect(uri, options);
  TicketModel = mongoose.model("Ticket", Ticket);
  next();
});

router.post("/add", async (req, res, next) => {
  const tc = new TicketModel(req.body);
  const err = await tc.save();

  if (err) {
    res.status(400).send(err);
  } else {
    res.send({status: true});
  }
});

router.get("/list", async (req, res, next) => {
  const tickets = await TicketModel.find();
  console.log(tickets);
  res.send(tickets);
});

router.get("/search", async (req, res, next) => {
  const tickets = await TicketModel.find();
  console.log(tickets);
  res.send(tickets);
});

module.exports = router;
