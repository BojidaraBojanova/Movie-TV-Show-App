const router = require('express').Router();

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

module.exports = router;
