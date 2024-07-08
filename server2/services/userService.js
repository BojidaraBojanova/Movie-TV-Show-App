const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET_KEY } = require('../config');

exports.getAllUsers = () => User.find();

exports.register = async(userData) => {

    console.log(userData);

    // if(userData.password !== userData.rePassword){
    //     throw new Error('Password mismatch!');
    // }

    if(userData.password){
        userData.password = await bcrypt.hash(userData.password, 10);
    }

    const user = await User.findOne({ email: userData.email });
    if(user){
        throw new Error('User already exists');
    }

    const createdUser = await User.create(userData);

    const token = await generateToken(createdUser);

    return{
        _id: createdUser._id,
        email: createdUser.email,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        token
    };
}

function generateToken(user){
    const payload = {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    }

    return jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
}