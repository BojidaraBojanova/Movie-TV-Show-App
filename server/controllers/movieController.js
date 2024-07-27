const router = require('express').Router();

const movieService = require("../services/movieService")

router.post('/add', async(req, res) => {
    const movieData = req.body;
    const userId = req.body.userId;

    console.log(movieData)
    console.log(userId)

    try{
        const result = await movieService.add(userId, movieData);
        res.status(201).json(result);
    }catch(error){
        console.error('Error adding movie', error);
        res.status(500).json({ message: error.message });
    }
})

router.get('', async(req, res) => {
    try{
        const movies = await movieService.getAllMoves();

        res.status(200).json(movies);
    }catch(error){
        console.error('Error in fetching the movies', error);
        res.status(500).json({ message: error.message });
    }
})


module.exports = router;
