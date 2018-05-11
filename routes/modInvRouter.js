var express = require('express');
var router = express.Router();
var sqlite = require('sqlite3');

// GET viewInv page
router.get('/', function(req, res) {
    res.render('modInv', { pagetitle: 'kegfinder' });
  });

router.get('/:condition/:style/:batchid/:location/:othernotes/:user/:id', (req, res) => {
    let kegIDs = req.params.id.split(',');
    let updates = Object.assign({}, req.params);

    updates['movedate'] = new Date().toDateString();
    delete updates.user;
    delete updates.id;

    let db = new sqlite.Database('data.db');
    
    kegIDs.forEach((id) => {
        for (var key in updates) {
            if (updates[key] != '--') {
                db.run(`UPDATE inventory${req.params.user} SET ${key} = "${updates[key]}" WHERE id = "${id}"`, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }
    });
    

    res.send('Received.');
}) 

module.exports = router;