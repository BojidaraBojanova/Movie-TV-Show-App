const mongoose = required('mongoose');

const watchListSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'itemModel'
        },
        itemModel: {
            type: String,
            required: true,
            enum: ['Movie', 'Series']
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const WatchList = mongoose.model('WatchList', watchListSchema);
module.exports = WatchList;