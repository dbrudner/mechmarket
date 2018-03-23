// app/routes.js
const path = require('path')
const db = require('../models/index');
const bodyParser = require('body-parser')

const keyboardRoutes = require('./keyboard-routes')

module.exports = function(app, passport) {

    // Signup
    app.post('/signup', passport.authenticate('local-signup'), (req, res) => {
        res.json('signing up')
    })
    
    // Login
    app.post('/login', passport.authenticate('local-login'), ((req, res) => {
        res.json('logging in')
    }));

    // Logout
    app.get('/logout', (req, res) => {
        req.logout();
        res.json('logging out');
    });

    // Used to find if user is logged in
    app.get('/test', function(req, res) {
        res.json(req.user)
    });

    // Post a new keyboard
    app.post('/api/new/keyboard', (req, res) => {
        const newKeyboard = {...req.body}
        db.Keyboard.create(newKeyboard)
    })

    // Get all keyboards
    app.get('/api/keyboards/all', (req, res) => {
        db.Keyboard.find()
        .populate('userId')
        .exec((err, result) => {
            res.json(result)            
            if (err) throw err;
        }) 
    })

    // Get one keyboard
    app.get('/api/keyboards/:id', (req, res) => {
        const id = req.params.id
        db.Keyboard.findOne({_id: id})
        .exec((err, result) => {res.json(result)})
    })

    // Serves react stuff.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/react/public/index.html'))
    });
};