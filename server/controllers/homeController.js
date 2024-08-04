const router = require('express').Router();
const movieService = require("../services/movieService")
const tvShowService = require("../services/tvShowService")

router.get('/top-rated', async(req, res) => {
    try {
        const topMovies = await movieService.topRated();
        console.log(topMovies);
        res.status(200).json(topMovies)
    } catch (error) {
        console.error('Error fetching top rated movies:', error);
        res.status(500).json({ message:'Error fetching top rated movies'})
    }
})

router.get('/top-newest', async(req, res) => {
    try {
        const topNewestTvShows = await tvShowService.topNewest();
        res.json(topNewestTvShows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching top newest tv-shows', error})
    }
})

module.exports = router;