// app/routes.js
const path = require('path')
const db = require('./models/index');
const bodyParser = require('body-parser')

const {postKeyboard, getKeyboards} = require ('./route-functions/keyboard')

module.exports = function(app, passport) {

    // Post a new keyboard
    app.post('/new/keyboard', (req, res) => {
        postKeyboard()
    })

    // Get all keyboards
    app.get('/api/keyboards/all', (req, res) => {
        const keyboards = getKeyboards()
        console.log('keys', keyboards)
        res.json(keyboards)
    })

    // Check if a user is logged in
    app.get('/test', (req, res) => {
        res.json(req.user)
    })

    // Logout
    app.get('/logout', (req, res) => {
        req.session.destroy();
        req.logout();
      });

    // Signup
    app.post('/signup', passport.authenticate('local-signup', {}));

    // Login
    app.post('/login', passport.authenticate('local-login', {}));

    // Serves react stuff.
    // app.get('*', (req, res) => {
    //     res.sendFile(path.join(__dirname+'/react/public/index.html'))
    // });
};



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    // res.redirect('/');
    res.json("Not logged in");
}