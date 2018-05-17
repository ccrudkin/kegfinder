var express = require('express');
var router = express.Router();
var sqlite = require('sqlite3');

// GET viewInv page
router.get('/', ensureAuthenticated, function(req, res) {
    res.render('viewInv', { pagetitle: 'kegfinder', userid: req.user });
});

// Return search results.
router.get('/:user/:searchBy/:term/:sort', ensureAuthenticated, (req, res) => {
    const db = new sqlite.Database('data.db');
    let user = req.params.user;
    let searchBy = req.params.searchBy;
    let term = req.params.term;
    let sort = req.params.sort;

    console.log(sort);
    
    if (term === 'getAll') {
        db.all(`SELECT * FROM inventory${user} ORDER BY "${sort}" COLLATE nocase`, (err, rows) => {
            if (!err) {
                console.log(rows);
                res.send(rows);
            } else {
                console.log(err);
                res.send(err);
            }
        });
    } else {
        db.all(`SELECT * FROM inventory${user} WHERE ${searchBy} COLLATE nocase = "${term}" ORDER BY "${sort}"`, (err, rows) => {
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

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/login/unauth');
	}
}

module.exports = router;