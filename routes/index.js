var express = require('express');
var router = express.Router();
var stats = require('../stats');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { stats: JSON.parse(stats.printStats()) });
  // res.sendFile(__dirname+"/../../orbp2p/index.html");
});

module.exports = router;
