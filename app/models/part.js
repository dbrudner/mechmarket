const mongoose = require('mongoose');

const partSchema = mongoose.Schema({
    userId: String, //populate this
    type: String,
    part: String,
    condition: String,
    imgUrl: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Part', partSchema);