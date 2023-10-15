const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    chatName: {
        type: String,
        require: true,
    },
    isGroupChat: {
        type: Boolean,
        default: false,
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
    latestMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
    },
    groupAdmin: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    groupPic: {
        type: String,
    },
    timeCreated: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Chat', chatSchema);