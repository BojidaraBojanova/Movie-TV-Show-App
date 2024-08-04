const router = require('express').Router();
const Comment = require('../models/Comment');
const Movie = require('../models/Movie');
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

router.get('/:movieId', async(req, res) => {
    const movieId = req.params.movieId;
    try {
        const movie = await movieService.getOne(movieId);
        res.status(200).json(movie);
    } catch (error) {
        console.error('Error fetching movie', error);
        res.status(500).json({ message: error.message });
    }
})

router.post('/:movieId/rate', async (req, res) => {
    const { movieId } = req.params;
    const { userId, rating } = req.body;

    try {
        const updatedMovie = await movieService.rateMovie(movieId, userId, Number(rating));
        res.status(200).json(updatedMovie);
    } catch (error) {
        console.error('Error rating movie', error);
        res.status(500).json({ message: error.message });
    }
})

router.put('/edit/:movieId', async(req, res) => {
    const movieData = req.body;
    const movieId = req.params.movieId;

    try {
        const editedMovie = await movieService.editMovie(movieId, movieData);
        res.status(201).json(editedMovie)
    } catch (error) {
        console.error('Error editing the Movie', error);
        res.status(500).json({message: error.message});
    }
})

router.post('/:movieId/comments', async(req, res) => {
    const { user, content } = req.body;
    const movieId = req.params.movieId;

    try {
        const newComment = new Comment({ user, content, item: movieId, itemModel: 'Movie' });
        await newComment.save();
        await Movie.findByIdAndUpdate(movieId, { $push: { comments: newComment._id } });

        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error adding comment', error);
        res.status(500).json({ message: error.message });
    }
})

router.get('/:movieId/comments', async (req, res) => {
    const movieId = req.params.movieId;

    try{
        const movie = await Movie.findById(movieId).populate({
            path:'comments',
            populate: {
                path: 'user',
                select: 'email'
            }
        });

        res.status(200).json(movie);
    }catch(error){
        console.error('Error in fetching the movie', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/:userId/addedMovies', async(req, res) => {
    const userId = req.params.userId;

    try {
        const result = await movieService.getAllMoviesByUser(userId);
        console.log(result)
        res.status(201).json(result);
    } catch (error) {
        console.error('Error fetching movies by user', error);
        res.status(500).json({ message: error.message });
        
    }
})


router.delete('/:movieId', async(req, res) => {
    const movieId = req.params.movieId;

    try {
        const deleteMovie = await movieService.deleteMovie(movieId);
        if(deleteMovie){
            res.status(200).json(deleteMovie);
        }else{
            res.status(404).json({error: 'Movie not found'})
        }
    } catch (error) {
        console.error('Error deleting the movie', error);
        res.status(500).json({message: error.message});
    }
}) 



module.exports = router;
