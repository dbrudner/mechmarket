// app/routes.js
const path = require('path')
const db = require('../models/index');
const bodyParser = require('body-parser')

module.exports = {
    postKeyboard: function(app, route) {
        app.post(route, (req, res) => {
            const newKeyboard = {...req.body}
            db.Keyboard.create(newKeyboard, (err, keyboard) => res.json(keyboard))
        })
        
    },

    getAllKeyboards: function(app, route) {
        app.get(route, (req, res) => {
            db.Keyboard.find()
            .populate('userId')
            .exec((err, result) => {
                res.json(result)            
                if (err) throw err;
            }) 
        })
    },

    getOneKeyboard: function(app, route) {
        app.get(route, (req, res) => {
            const id = req.params.id
            db.Keyboard.findOne({_id: id})
            .populate('userId')
            .exec((err, result) => {res.json(result)})
        })
    }
}