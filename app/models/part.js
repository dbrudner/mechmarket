const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const partSchema = new Schema({
    userId: String, //populate this
    type: String,
    part: String,
    condition: String,
    quantity: Number,
    imgUrl: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Part', partSchema);