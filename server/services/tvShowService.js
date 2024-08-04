const TvShow = require('../models/Series');
const Comment = require('../models/Comment')

exports.add = async(userId, tvShowData) => {
    const addedTvShow = await TvShow.create({
        ...tvShowData,
        addedBy: userId
    });

    return addedTvShow
}

exports.addComment = async(tvShowId, text) => {
    const addedComment = await TvShow.findByIdAndUpdate(tvShowId, text, {new: true, runValidators: true})

    return addedComment;
}

exports.getAllTvShows = () => TvShow.find();

exports.getAllMoviesByUser = (tvShowId) => TvShow.find({ addedBy: tvShowId });

exports.getAllComments = () => Comment.findById(tvShowId); 

exports.getOne = (tvShowId) => TvShow.findById(tvShowId);

exports.topNewest = () => {
    return TvShow.find().sort({ releaseDate: -1 }).limit(5)
}

exports.rateTvShow = async(tvShowId, userId, rating) => {
    const tvShow = await TvShow.findById(tvShowId);
    if(!tvShow){
        throw new Error('TV-Show not found');
    }

    if(typeof rating !== 'number' || rating < 0 || rating > 10) {
        throw new Error('Rating must be a number between 0 and 10');
    }

    const existingRatingIndex = tvShow.ratings.findIndex(r => r.user.equals(userId));

    if(existingRatingIndex >= 0) {
        tvShow.ratings[existingRatingIndex].rating = rating;
    }else{
        tvShow.ratings.push({user:userId, rating})
    }

    await tvShow.save();
    return tvShow;
}

exports.editTvShow = async(tvShowId, tvShowData) => {
    const updatedTvShow = await TvShow.findByIdAndUpdate(tvShowId, tvShowData, {new: true, runValidators: true});

    return updatedTvShow
}

exports.deleteTvShow = (tvShowId) => TvShow.findByIdAndDelete(tvShowId);