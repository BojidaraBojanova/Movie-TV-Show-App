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

module.exports = router;
