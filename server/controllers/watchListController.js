const router = require('express').Router();
const watchListService = require('../services/watchListService');

router.post('/add', async(req, res) => {
    const { userId, itemId, itemType } = req.body;
    console.log('Add item request body:', req.body);

    try{
        const result = await watchListService.addToWatchList(userId, itemId, itemType);
        return res.status(200).json(result);
    }catch(error){
        return res.status(500).json({success:false, message:'Internal Server Error'});
    }
})

router.get('/:userId', async(req, res) => {
    const {userId} = req.params;

    try {
        const result = await watchListService.getWatchList(userId);
        console.log('WatchList Controller Result:', result);

        return res.status(200).json(result);
    } catch (error) {
        console.error('WatchList Controller Error:', error);
        return res.status(500).json({success: false, message:'Internal Server Error'})
    }
})

router.delete('/remove', async(req, res) => {
    const { userId, itemId, itemType } = req.body;
    try {
        const result = await watchListService.removeFromWatchList(userId, itemId, itemType);
        console.log(result)
        return res.status(200).json(result)
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: 'Server error' });
    }
})



module.exports = router;