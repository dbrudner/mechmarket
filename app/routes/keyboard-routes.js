// app/routes.js
const path = require('path')
const db = require('../models/index');
const bodyParser = require('body-parser')


module.exports = function(app, passport) {

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
            console.log('res', result)
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