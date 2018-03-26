const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const keyboardSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    switches: String,
    size: String,
    layout: String,
    custom: Boolean,
    sold: Boolean,
    condition: String,
    imgs: Array,
    plate: String,
    keycaps: String,
    hasKeycaps: Boolean,
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