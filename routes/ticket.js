const express = require("express");
const router = express.Router();
const conn = require("../connMongo");
const TicketModel = require("../ticketSchema");

/* GET home page. */
router.post("/add", function(req, res, next) {
  console.log(req.body);
  res.send("ticket ekeleme");
});

module.exports = router;
