var express = require('express');
var router = express.Router();

// respond with confirmation
router.get('/', function(req, res) {
    res.send('New inventory intialized.');
});

module.exports = router;