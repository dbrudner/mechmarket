const mongoose = require('mongoose');
const db = require('../models/index');

module.exports = {
    postKeyboard(keyboardObject) {
        db.Keyboard.create({
            keyboard: 'new'
        })
    },

    getKeyboards() {
        db.Keyboard.find({}, (err, res) => {
            console.log(res)
        })
    }
}