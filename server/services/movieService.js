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