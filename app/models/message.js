const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    senderId: String, //populate
    receiverId: String, //populate
    timeSent: Date,
    timeRead: Date,
    read: Boolean,
    message: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Message', messageSchema);