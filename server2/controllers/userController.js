const router = require('express').Router();

const userService = require('../services/userService');

// router.get('/admin', async(req, res) => {
//     try{
//         const users = await userService.getAllUsers();

//         res.status(200).json(users);
//     }catch(error){
//         console.error('Error in fetching the users', error);
//         res.status(500).json({ message: error.message });
//     }
// })

router.post('/registration', async(req, res) => {
    try{
        const userData = req.body;

        const result = await userService.register(userData);
        res.status(201).json(result);
    }catch(error){
        console.error('Error in user registration', error);
        res.status(500).json({ message: error.message });
    }
})


module.exports = router;