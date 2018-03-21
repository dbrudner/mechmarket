const mongoose = require('mongoose');

const keyboardSchema = mongoose.Schema({
    userId: String, //populate this
    switches: String,
    size: String,
    layout: String,
    custom: Boolean,
    sold: Boolean,
    condition: String,
    imgUrl: String,
    plate: String,
    forSale: Boolean,
    upvotes: {
        type: Number,
        default: 0,
        required: true
    },
    created_at: { type: Date, required: true, default: Date.now }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Keyboard', keyboardSchema);