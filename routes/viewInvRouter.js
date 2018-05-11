var express = require('express');
var router = express.Router();
var sqlite = require('sqlite3');

// GET viewInv page
router.get('/', function(req, res) {
  res.render('viewInv', { pagetitle: 'kegfinder' });
});

// Return search results.
router.get('/:user/:searchBy/:term', (req, res) => {
    const db = new sqlite.Database('data.db');
    let user = req.params.user;
    let searchBy = req.params.searchBy;
    let term = req.params.term;
    
    if (term === 'getAll') {
        db.all(`SELECT * FROM inventory${user}`, (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.send(err);
            }
        });
    } else {
        db.all(`SELECT * FROM inventory${user} WHERE ${searchBy} COLLATE nocase = "${term}"`, (err, rows) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
                res.send(err);
            }
        });
    }
    db.close();
});

module.exports = router;