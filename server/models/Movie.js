const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
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
        type: String
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
            min: 1,
            max: 5
        }
    }],
    averageRating: {
        type: Number,
        min: 1,
        max: 5
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    releaseDate: {
        type:String
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,  ref:'User', required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

movieSchema.pre('save', function(next){
    if(this.ratings.length > 0){
        this.averageRating = this.ratings.reduce((acc, curr) => acc + curr.rating, 0) / this.ratings.length;
    }else{
        this.averageRating = null;
    }
    next();
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;