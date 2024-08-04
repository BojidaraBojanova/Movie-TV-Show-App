const Movie = require('../models/Movie');

exports.add = async(userId, movieData) => {
    const addedMovie = await Movie.create({
        ...movieData,
        addedBy: userId
    });

    return addedMovie
}

exports.getAllMoves = () => Movie.find();

exports.getOne = (movieId) => Movie.findById(movieId);

exports.getAllMoviesByUser = (userId) => Movie.find({ addedBy: userId });

exports.topRated = () => {
    return Movie.find().sort({ averageRating: -1 }).limit(5);
} 

exports.rateMovie = async(movieId, userId, rating) => {
    const movie = await Movie.findById(movieId);
    if(!movie){
        throw new Error('Movie not found');
    }

    console.log(rating);

    if(typeof rating !== 'number' || rating < 0 || rating > 10) {
        throw new Error('Rating must be a number between 0 and 10');
    }

    const existingRatingIndex = movie.ratings.findIndex(r => r.user.equals(userId));

    if(existingRatingIndex >= 0) {
        movie.ratings[existingRatingIndex].rating = rating;
    }else{
        movie.ratings.push({user:userId, rating})
    }

    await movie.save();
    return movie;
}

exports.editMovie = async(movieId, movieData) => {
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, movieData, {new: true, runValidators: true});

    return updatedMovie
}

exports.deleteMovie = (movieId) => Movie.findByIdAndDelete(movieId);