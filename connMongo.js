const mongoose = require("mongoose");

const conn = mongoose.createConnection("mongodb://localhost:27017/tickets", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = conn;