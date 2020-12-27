const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/dbTicket";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};
const Ticket = require("../schemas/ticket");
const User = require("../schemas/user");

var TicketModel = null;
var UserModel = null;

router.use(async (req, res, next) => {
  await mongoose.connect(uri, options);
  TicketModel = mongoose.model("Ticket", Ticket);
  UserModel = mongoose.model("User", User);
  next();
});

router.use(
  fileUpload({
    createParentPath: true
  })
);

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

router.post("/upload/", async (req, res, next) => {
  const {ticketFile} = req.files;
  ticketFile.mv("./public/ticketFiles/" + ticketFile.name);
  res.send({status: true});
});

router.get("/show/:fileName", async (req, res, next) => {
  res.sendFile(req.params.fileName, {
    root: __dirname + "/../public/ticketFiles/"
  });
});

router.get("/list/", async (req, res, next) => {
  var findParam = {};
  const {userId, filter, search, byName} = req.query;
  if (userId) {
    findParam.userId = userId;
  } else if (filter && filter != "all") {
    findParam.status = filter;
  } else if (search) {
    if (byName) {
      var findUser = {name: new RegExp(search, "i")};
      const users = await UserModel.find(findUser);
      const ids = users.map(user => {
        return user._id;
      });
      const tickets = await TicketModel.find({userId: {$in: ids}});
      res.send(tickets);
      return 0;
    } else {
      findParam.subject = search;
    }
  }
  const tickets = await TicketModel.find(findParam);
  res.send(tickets);
});

module.exports = router;
