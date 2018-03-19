const mongoose = require('mongoose');
const db = require('../models/index');

module.exports = {
    postKeyboard(keyboardObject) {
        console.log(db)        
        db.Keyboard.insertOne({
            keyboardObject
        })
    }
}