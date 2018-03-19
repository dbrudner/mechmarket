
const mongoose = require('mongoose');

const keyboardSchema = mongoose.Schema({
    userId: Number, //populate this
    switches: String,
    size: String,
    layout: String,
    custom: Boolean

});

// create the model for users and expose it to our app
module.exports = mongoose.model('Keyboard', keyboardSchema);