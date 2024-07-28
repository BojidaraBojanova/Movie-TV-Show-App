const TvShow = require('../models/Series');

exports.add = async(userId, tvShowData) => {
    const addedTvShow = await TvShow.create({
        ...tvShowData,
        addedBy: userId
    });

    return addedTvShow
}

exports.getAllTvShows = () => TvShow.find();

exports.getOne = (tvShowId) => TvShow.findById(tvShowId);