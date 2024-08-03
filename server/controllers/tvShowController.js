const router = require('express').Router();
const Comment = require('../models/Comment');
const Series = require("../models/Series");
const tvShowService = require("../services/tvShowService")

router.post('/add', async(req, res) => {
    const tvShowData = req.body;
    const userId = req.body.userId;

    try{
        const result = await tvShowService.add(userId, tvShowData);
        res.status(201).json(result);
    }catch(error){
        console.error('Error adding TV Show', error);
        res.status(500).json({ message: error.message });
    }
})

router.get('', async(req, res) => {
    try{
        const tvShow = await tvShowService.getAllTvShows();

        res.status(200).json(tvShow);
    }catch(error){
        console.error('Error in fetching the TV Show', error);
        res.status(500).json({ message: error.message });
    }
})

router.get('/:tvShowId', async(req, res) => {
    const tvShowId = req.params.tvShowId;
    try {
        const tvShow = await tvShowService.getOne(tvShowId);
        res.status(200).json(tvShow);
    } catch (error) {
        console.error('Error fetching TV Show', error);
        res.status(500).json({ message: error.message });
    }
})

router.post('/:tvShowId/rate', async (req, res) => {
    const { tvShowId } = req.params;
    const { userId, rating } = req.body;

    try {
        const updatedTvShow = await tvShowService.rateTvShow(tvShowId, userId, Number(rating));
        res.status(200).json(updatedTvShow);
    } catch (error) {
        console.error('Error rating Tv-Show', error);
        res.status(500).json({ message: error.message });
    }
})

router.put('/edit/:tvShowId', async(req, res) => {
    const tvShowData = req.body;
    const tvShowId = req.params.tvShowId;

    try {
        const editedTvShow = await tvShowService.editTvShow(tvShowId, tvShowData);
        res.status(201).json(editedTvShow)
    } catch (error) {
        console.error('Error editing the Tv-Show', error);
        res.status(500).json({message: error.message});
    }
})

router.post('/:tvShowId/comments', async(req, res) => {
    const { user, content } = req.body;
    const tvShowId = req.params.tvShowId;

    try {
        const newComment = new Comment({ user, content, item: tvShowId, itemModel: 'Series' });
        await newComment.save();
        await Series.findByIdAndUpdate(tvShowId, { $push: { comments: newComment._id } });

        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error adding comment', error);
        res.status(500).json({ message: error.message });
    }
})

router.get('/:tvShowId/comments', async (req, res) => {
    const tvShowId = req.params.tvShowId;

    try{
        const tvShow = await Series.findById(tvShowId).populate({
            path:'comments',
            populate: {
                path: 'user',
                select: 'email'
            }
        });

        res.status(200).json(tvShow);
    }catch(error){
        console.error('Error in fetching the TV Show', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/:userId/addedTvShows', async(req, res) => {
    const userId = req.params.userId;

    try {
        const result = await tvShowService.getAllMoviesByUser(userId);
        console.log(result)
        res.status(201).json(result);
    } catch (error) {
        console.error('Error fetching tv-shows by user', error);
        res.status(500).json({ message: error.message });
        
    }
})

router.delete('/:tvShowId', async(req, res) => {
    const tvShowId = req.params.tvShowId;

    try {
        const deleteTvShow = await tvShowService.deleteTvShow(tvShowId);
        if(deleteTvShow){
            res.status(200).json(deleteTvShow);
        }else{
            res.status(404).json({error: 'TV-Show not found'})
        }
    } catch (error) {
        console.error('Error deleting the tv-show', error);
        res.status(500).json({message: error.message});
    }
})

module.exports = router;
