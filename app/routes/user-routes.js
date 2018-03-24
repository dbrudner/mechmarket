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

    login: function(app, passport, route) {
        app.post(route, passport.authenticate('local-login'), ((req, res) => {
            console.log('oggging in')            
            res.json('logging in')
        }));
    },


    // Login
    // login: function(app, passport, route) {
    //     let error;
    //     app.post(route, passport.authenticate('local-login',
    //     (err, user, info) => {
    //         if (err) {
    //             console.log(err)
    //             error = err
    //         }
    //     }),
    //     (req, res) => {
    //         console.log('error')
    //         if (error) {
    //             res.json(error)
    //         }
    //         res.json('logging in')
    //     });
    // },


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