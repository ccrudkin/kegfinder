var express = require('express');
var router = express.Router();
var sqlite = require('sqlite3');
const db = new sqlite.Database('data.db');

// initialize new table in database
function newInv(user) {
    db.run(`CREATE TABLE inventory${user} (id TEXT PRIMARY KEY, initialized NUMERIC, condition TEXT, 
        type TEXT, batchid TEXT, style TEXT, fillnotes TEXT, location TEXT, movedate NUMERIC, 
        othernotes TEXT)`, (err) => {
            if (err) {
                console.log('Error: ' + err);
            } else {
                console.log('New table successfully created.');
            }
    });
}

function addKegs(user, num, type) {
    let initdate = new Date();
    initdate = initdate.toISOString();
    for (let i = 0; i < num; i++) {
        db.run(`INSERT INTO inventory${user} (id, initialized, condition, type, location) 
            VALUES ("${i}", "${initdate}", "initialized", "${type}", "brewery")`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
    }
}


// respond with confirmation
router.get('/:user/:num/:type/:naming/:add', (req, res) => {
    let user = req.params.user;
    let num = req.params.num;
    let type = req.params.type;
    let add = req.params.add;
    console.log('Add: ' + add);

    let initdate = new Date();
    initdate = initdate.toISOString();

    if (add === 'false') {
        db.serialize(() => {
            db.run(`CREATE TABLE inventory${user} (id NUMERIC PRIMARY KEY, initialized NUMERIC, condition TEXT, 
                type TEXT, batchid TEXT, style TEXT, fillnotes TEXT, location TEXT, movedate NUMERIC, 
                othernotes TEXT)`, (err) => {
                    if (err) {
                        console.log('Error: ' + err);
                        res.send('Please check box if you are adding to an existing inventory.<br><br>' + err);
                    } else {
                        console.log('New table successfully created.');
                        res.send('Success.');
                    }
            });

            for (let i = 1; i <= num; i++) {
                db.run(`INSERT INTO inventory${user} (id, initialized, condition, type, location) 
                    VALUES ("${i}", "${initdate}", "initialized", "${type}", "brewery")`, (err) => {
                        if (err) {
                            console.log(err);
                        }
                });
            }
        });
    } else {
        db.serialize(() => {
            let lastID = 'snoot';
            db.get(`SELECT id, MAX(id) FROM inventory${user}`, (err, row) => {
                if (!err) {
                    console.log(row.id);
                    lastID = parseInt(row.id);
                    db.serialize(() => {
                        for (let i = lastID + 1; i <= lastID + parseInt(num); i++) {
                            console.log(i + ' ' + lastID + ' ' + num);
                            db.run(`INSERT INTO inventory${user} (id, initialized, condition, type, location) 
                                VALUES ("${i}", "${initdate}", "initialized", "${type}", "brewery")`, (err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                            });
                        }
                    });
                } else {
                    console.log(err);
                }
            })
        });
        res.send('Add request received.');
    }
});

module.exports = router;