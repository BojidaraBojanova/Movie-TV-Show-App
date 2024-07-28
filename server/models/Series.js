const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    writer: {
        type: String,
        required: true
    },
    actors: [String],
    genre: [String],
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    trailerUrl: {
        type: String
    },
    ratings: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            min: 0,
            max: 10
        }
    }],
    averageRating: {
        type: Number,
        min: 0,
        max: 10
    },
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }],
    releaseDate: {
        type:Date
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

seriesSchema.pre('save', function(next){
    if(this.ratings.length > 0){
        const total = this.ratings.reduce((acc, curr) => acc + curr.rating, 0);
        this.averageRating = total / this.ratings.length;
    }else{
        this.averageRating = 0;
    }
    next();
});

const Series = mongoose.model('Series', seriesSchema);
module.exports = Series;