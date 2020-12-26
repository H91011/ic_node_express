var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/hadi", function(req, res, next) {
  res.send("hadi çalış");
});

module.exports = router;
