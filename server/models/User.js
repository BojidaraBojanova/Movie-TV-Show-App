const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    addedMovies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }],
    addedSeries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Series'
    }],
    ratedMovies:[{
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        }
    }],
     ratedSeries:[{
        series: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Series'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        }
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    watchList: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'watchListModel'
        },
        watchListModel: {
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

const User = mongoose.model('User', userSchema);

module.exports = User;