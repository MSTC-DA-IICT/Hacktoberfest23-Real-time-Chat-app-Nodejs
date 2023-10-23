const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    profilePic: {
        type: String,
    },
    timeCreated: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('User', userSchema);
