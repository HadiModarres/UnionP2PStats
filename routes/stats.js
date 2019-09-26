var express = require('express');
var router = express.Router();
var stats = require('../stats');

router.get('/search_started', function(req, res, next) {
  // console.log("started search");
  stats.searchStarted(req.query.id, req.query.source_name, req.query.query);
  // console.info(stats.printStats());
  res.send('start recorded');
});
router.get('/search_relayed', function(req, res, next) {
  // console.log("relayd search");
  stats.searchRelayed(req.query.id,req.query.node_name);
  // console.info(stats.printStats());
  res.send('relay recorded');
});
router.get('/search_revisited', function(req, res, next) {
  // console.log("revisited search");
  stats.searchRevisited(req.query.id,req.query.node_name);
  // console.info(stats.printStats());
  res.send('revisit recorded');
});
router.get('/search_responded', function(req, res, next) {
  // console.log("responded search");
  stats.searchResponded(req.query.id,req.query.node_name);
  // console.info(stats.printStats());
  res.send('response recorded');
});
router.get('/search_discarded', function(req, res, next) {
  // console.log("discarded search");
  stats.searchDiscarded(req.query.id,req.query.node_name);
  // console.info(stats.printStats());
  res.send('discard recorded');
});

router.get('/get_nodes', function (req, res, next) {
  // console.log("all nodes");
  res.send(JSON.stringify(stats.getNodes()));
});

router.get('/neighbors_updated', function (req, res, next) {
  // console.log("neighbors_updated");
  // console.info(JSON.parse(req.query.json));
  stats.neighborsUpdated(JSON.parse(req.query.json));
  res.send("ok");
});


router.get('/last_search', function (req, res, next) {
  res.send(JSON.stringify(stats.lastSearch));
});

router.get('/link_changed', function (req, res, next) {
    stats.linkChanged();
  res.send("ok");
});

router.get('/link_changes', function (req, res, next) {
  res.send(stats.getLinkChangeTimeWindow());
});


router.get('/node_stats', function (req, res, next) {
  stats.nodeStats(JSON.parse(req.query.json));
  res.send("ok");
});

router.get('/get_node_stats', function (req, res, next) {
  res.send(JSON.stringify(stats.getNodeStats()));
});




module.exports = router;
