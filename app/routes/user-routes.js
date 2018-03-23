// app/routes.js
const path = require('path')
const db = require('../models/index');
const bodyParser = require('body-parser')

module.exports = function(app, passport) {

    // Signup
    app.post('/signup', passport.authenticate('local-signup', {}));

    // Login
    app.post('/login', passport.authenticate('local-login', {}));

    // Serves react stuff.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/react/public/index.html'))
    });
};