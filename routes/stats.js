var express = require('express');
var router = express.Router();
var stats = require('../stats');

router.get('/search_started', function(req, res, next) {
  console.log("started search");
  stats.searchStarted(req.query.id, req.query.source_id, req.query.query);
  console.info(stats.printStats());
  res.send('start recorded');
});
router.get('/search_relayed', function(req, res, next) {
  console.log("relayd search");
  stats.searchRelayed(req.query.id);
  console.info(stats.printStats());
  res.send('relay recorded');
});
router.get('/search_revisited', function(req, res, next) {
  console.log("revisited search");
  stats.searchRevisited(req.query.id);
  console.info(stats.printStats());
  res.send('revisit recorded');
});
router.get('/search_responded', function(req, res, next) {
  console.log("responded search");
  stats.searchResponded(req.query.id);
  console.info(stats.printStats());
  res.send('response recorded');
});
router.get('/search_discarded', function(req, res, next) {
  console.log("discarded search");
  stats.searchDiscarded(req.query.id);
  console.info(stats.printStats());
  res.send('discard recorded');
});



module.exports = router;
