const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    pinId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pin',
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    photos: {
        type: [String],
        default: [],
    },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
