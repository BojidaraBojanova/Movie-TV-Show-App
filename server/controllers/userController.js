const router = require('express').Router();

const userService = require('../services/userService');

router.get('/admin', async(req, res) => {
    try{
        const users = await userService.getAllUsers();

        res.status(200).json(users);
    }catch(error){
        console.error('Error in fetching the users', error);
        res.status(500).json({ message: error.message });
    }
})


module.exports = router;