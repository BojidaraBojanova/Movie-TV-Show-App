const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'itemModel',
        required: true
    },
    itemModel: {
        type: String,
        required: true,
        enum: ['Movie', 'Series']
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;