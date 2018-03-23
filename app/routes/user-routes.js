// app/routes.js
const path = require('path')
const db = require('../models/index');
const bodyParser = require('body-parser')

const keyboardRoutes = require('./keyboard-routes')

module.exports = {

    // Signup
    signup: function(app, passport, route) {
        app.post(route, passport.authenticate('local-signup'), (req, res) => {
            res.json('signing up')
        })
    },


    // Login
    login: function(app, passport, route) {
        app.post(route, passport.authenticate('local-login'), ((req, res) => {
            res.json('logging in')
        }));
    },


    // Logout
    logout: function(app, route) {
        app.get(route, (req, res) => {
            req.logout();
            res.json('logging out');
        });
    },


    // Used to find if user is logged in
    test: function(app, route) {
        app.get(route, function(req, res) {
            res.json(req.user)
        });
    }
};