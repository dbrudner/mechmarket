const mongoose = require('mongoose');
const db = require('../models/index');

module.exports = {
    postKeyboard(keyboardObject) {
        db.Keyboard.create({
            keyboard: 'new'
        }), function(err, result) {
            if (err) throw err;
            return result
        }
    },

    // Working
    getKeyboards() {
        db.Keyboard.find({})
        .exec((err, result) => {
            console.log('res', result)
            if (err) throw err;
            return result;
        }) 
    }
}