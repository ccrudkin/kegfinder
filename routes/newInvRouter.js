var express = require('express');
var router = express.Router();

// render New Inventory page
router.get('/', function(req, res) {
  res.render('newInv', { pagetitle: 'kegfinder', message: '' });
});

module.exports = router;