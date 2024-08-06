const router = require('express').Router();

const userController = require('./controllers/userController');
const movieController = require('./controllers/movieController')
const tvShowController = require('./controllers/tvShowController')
const watchListController = require('./controllers/watchListController')
const homeController = require('./controllers/homeController')
const searchController = require('./controllers/searchController');

router.use('/users', userController)
router.use('/movies', movieController)
router.use('/tvShows', tvShowController)
router.use('/watchList', watchListController)
router.use('/', homeController)
router.use('/', searchController)

module.exports = router;
