var express = require('express');
var router = express.Router();

// render New Inventory page
router.get('/', function(req, res, next) {
  res.render('newInv', { title: 'Create new inventory' });
});

module.exports = router;