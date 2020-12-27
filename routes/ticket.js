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
  tc.save().then((err, ticket) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send({status: true});
    }
  });
});

router.post("/update", async (req, res, next) => {
  const {id, data, status} = req.body;
  TicketModel.updateOne({_id: id}, {$push: {body: data}, status}, function(
    err,
    docs
  ) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send({status: true});
    }
  });
});

router.get("/list/", async (req, res, next) => {
  console.log(req.query);
  var findParam = {};
  if (req.query.userId) {
    findParam.userId = req.query.userId;
  }
  const tickets = await TicketModel.find(findParam);
  res.send(tickets);
});

router.get("/search", async (req, res, next) => {
  const tickets = await TicketModel.find();
  res.send(tickets);
});

module.exports = router;
