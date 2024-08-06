const router = require('express').Router();
const movieService = require('../services/movieService');
const tvShowService = require('../services/tvShowService');

router.get('/search', async(req, res) => {
    const title = req.query.q

    console.log(title);

    try {
        const movies = await movieService.search(title);
        console.log('Movies found:', movies);
        const tvShows = await tvShowService.search(title);
        console.log('TV Shows found:', tvShows);

        res.json({
            movies,
            tvShows
        });
    } catch (error) {
        console.error('Error while searching:', error);
        res.status(500).json({ error: 'An error occurred while searching'})
    }
})

module.exports = router;