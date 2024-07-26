const router = require('express').Router();

const userService = require('../services/userService');


router.post('/register', async(req, res) => {
    try{
        const userData = req.body;

        const result = await userService.register(userData);
        res.status(200).json(result);
    }catch(error){
        console.error('Error in user registration', error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', async(req, res) => {
    const userData = req.body;

    try {
        const result = await userService.login(userData);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in user login', error );
        res.status(500).json({ message: error.message })
    }
});

router.get('/logout', async(req, res) => {
    try{
        res.clearCookie('user');
        res.status(200).json({ok: true, message: 'Logout successful'});
    }catch(error){
        console.error('Error in logout', error);
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;