// app/routes.js
const path = require('path')
const db = require('../models/index');
const bodyParser = require('body-parser')

module.exports = function(app, passport) {

    // Signup
    app.post('/signup', passport.authenticate('local-signup', {}));

    // Login
    app.post('/login', passport.authenticate('local-login', {}));

    // Logout
    app.get('/logout', (req, res) => {
        req.logout();
        res.json('logging out');
    })

    // Used to find if user is logged in
    app.get('/test', function(req, res) {
        res.json(req.user)
    })

    // Serves react stuff.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/react/public/index.html'))
    });
};