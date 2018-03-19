const mongoose = require('mongoose');
const db = require('../models/index');

module.exports = {
    postKeyboard(keyboardObject) {
        db.Keyboard.create({
            keyboard: 'new'
        }), function(err, result) {
            if (err) throw err;
            console.log(result)
        }
    },

    // Working
    getKeyboards() {
        db.Keyboard.find({})
        .exec((err, result) => {
            console.log('hey')
            console.log(result)
            console.log(err)
        }) 
    }
}