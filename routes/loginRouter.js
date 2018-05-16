var express = require('express');
var router = express.Router();
var sqlite = require('sqlite3');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var bcrypt = require('bcryptjs');


// login page
router.get('/', function(req, res) {
    res.render('login', { pagetitle: 'kegfinder', status: '', errors: '' });
});

// new login
router.get('/new', function(req, res) {
    res.render('login', { pagetitle: 'kegfinder', status: 'You are registered and can now log in.', errors: '' });
});

// unauthorized
router.get('/unauth', (req, res) => {
    res.render('login', { pagetitle: 'kegfinder', status: '', errors: 'You are not logged in.' });
});

// retry
router.get('/retry', (req, res) => {
    res.render('login', { pagetitle: 'kegfinder', status: '', errors: 'Incorrect username or password.' });
});

// logged out success
router.get('/out', (req, res) => {
    res.render('login', { pagetitle: 'kegfinder', status: 'You logged out successfully.', errors: '' });
});

// register page
router.get('/register', (req, res) => {
    res.render('register', { pagetitle: 'kegfinder', errors: '' });
});

router.post('/register', [
        check('username').isLength({ min: 1 }).withMessage('Username is required.'),
        check('email').isEmail().withMessage('Must use a valid email address.'),
        check('password').isLength({ min: 5 }).withMessage('Password must be 5 characters long.'),
        check('password2').exists()
            .custom((value, { req }) => value === req.body.password).withMessage('Passwords must match.')
    ],

    (req, res) => {
        const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
            return `${msg}`;
        };
        const result = validationResult(req).formatWith(errorFormatter);
        if (!result.isEmpty()) {
            res.render('register', { pagetitle: 'kegfinder', errors: result.array() });
        } else {
            // intake form info from POST
            let username = req.body.username;
            let email = req.body.email;
            let password = req.body.password;

            const db = new sqlite.Database('data.db');
            db.get(`SELECT EXISTS (SELECT * FROM users WHERE username = "${username}")`, (err, row) => {
                if (!err) {
                    if (row[`EXISTS (SELECT * FROM users WHERE username = "${username}")`] === 1) {
                        res.render('register', { pagetitle: 'kegfinder', errors: { msg: 'Username already in use.' } });
                    } else {
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(password, salt, function(err, hash) {
                                if (err) {
                                    throw err;
                                } else {
                                    db.run(`INSERT INTO users (username, password, email) 
                                    VALUES ("${username}", "${hash}", "${email}")`, (err) => {
                                    if (err) {
                                        res.render('register', { pagetitle: 'kegfinder', errors: { msg: 'Database error.' } });
                                    } else {
                                        res.redirect('/login/new');
                                    }
                                    }); 
                                }
                            });
                        });
                    }
                } else {
                    console.log(err);
                }
            });

            
        }    
});

// Passport auth setup
passport.use(new LocalStrategy(function(username, password, done) {
    const db = new sqlite.Database('data.db');
// /*
    db.get(`SELECT username, password FROM users WHERE username = "${username}"`, (err, row) => {
        if (!row) return done(null, false, {});
        console.log(row.username + ' ' + row.password);
        // hashed password loaded, now compare with input
        bcrypt.compare(password, row.password, function(err, res) {
            if (err) {
                console.log(err);
                return done(null, false, {});
            } else {
                return done(null, row.username);
            }
        });
    });
// */   
    
    
    /*
    db.get(`SELECT username FROM users WHERE username = "${username}" AND password = "${password}"`, function(err, row) {
        if (!row) return done(null, false, {});
        return done(null, row.username);
        });
    */
}));

passport.serializeUser(function(user, done) {
    return done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    const db = new sqlite.Database('data.db');
    db.get(`SELECT username FROM users WHERE username = "${user}"`, function(err, row) {
        if (!row) {
            console.log('Auth error.');
            return done(null, false)};
        return done(null, user);
    });
});

router.post('/', 
    passport.authenticate('local', { successRedirect: '/',
    failureRedirect: '/login/retry',
    failureFlash: true }),
    function(req, res) {
        res.redirect('/');
    }
);

/*
router.get('/', function(req, res) {
    req.logout();
});
*/

module.exports = router;