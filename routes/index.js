var express = require('express');
var router = express.Router();
var stats = require('../stats');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { stats: JSON.parse(stats.printStats()) });
});

module.exports = router;
