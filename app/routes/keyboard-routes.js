// app/routes.js
const path = require('path')
const db = require('../models/index');
const bodyParser = require('body-parser')

module.exports = function(app, passport) {

    // Post a new keyboard
    app.post('/new/keyboard', (req, res) => {
        postKeyboard()
    })

    // Get all keyboards
    app.get('/api/keyboards/all', (req, res) => {
        db.Keyboard.find({})
        .exec((err, result) => {
            console.log('res', result)
            res.json(result)            
            if (err) throw err;
        }) 
    })

    // Serves react stuff.
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname+'/react/public/index.html'))
    });
};