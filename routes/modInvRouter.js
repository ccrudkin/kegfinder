var express = require('express');
var router = express.Router();
var sqlite = require('sqlite3');

// GET viewInv page
router.get('/', function(req, res) {
    res.render('modInv', { pagetitle: 'kegfinder' });
  });

// intake information to update inventory via get
router.get('/:condition/:style/:batchid/:location/:othernotes/:user/:id', (req, res) => {
    let kegIDs = req.params.id.split(',');
    let updates = Object.assign({}, req.params);

    updates['movedate'] = new Date().toDateString(); // set movedate to now
    delete updates.user; // delete these fields so we can loop through whole object below
    delete updates.id; // keeping these would screw up the for() loop

    let db = new sqlite.Database('data.db');
    
    kegIDs.forEach((id) => {
        // for each keg id in GET request, loop through each updated field (i.e., not '--')
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