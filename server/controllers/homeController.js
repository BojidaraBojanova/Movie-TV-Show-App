const router = require('express').Router();
const movieService = require("../services/movieService")


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

module.exports = router;