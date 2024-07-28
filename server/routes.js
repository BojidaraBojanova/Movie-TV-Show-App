const router = require('express').Router();

const userController = require('./controllers/userController');
const movieController = require('./controllers/movieController')
const tvShowController = require('./controllers/tvShowController')

router.use('/users', userController)
router.use('/movies', movieController)
router.use('/tvShows', tvShowController)

module.exports = router;
