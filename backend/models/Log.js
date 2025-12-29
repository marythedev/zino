const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
