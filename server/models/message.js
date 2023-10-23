const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    content: {
        type: String,
        require: true,
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Message', messageSchema);