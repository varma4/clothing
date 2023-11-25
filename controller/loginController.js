const LoginModel = require('../model/loginModel')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenCreation = (id, user) => {
    return jwt.sign({ id, user }, process.env.SEC, {
        expiresIn: 100000
    });
};


const signup = async (req, res) => {
    // if(!req.body.name || !req.body.email || !req.body.password || !req.body.confirmpassword){
    //     return res.status(404).json({
    //         status: 'failed',
    //         message: 'please enter all the fields'
    //     })
    // }
    console.log(req.body);
    await LoginModel.create(req.body)
    res.status(201).json({
        status: 'success',
        message: 'user Created'
    })
}


const loginUser = async(req, res) => {
    if(!req.body.email || !req.body.password){
        return res.status(404).json({
            status: 'failed',
            message: 'please enter all the fields'
        })
    }

    const email = req.body.email
    let user = await LoginModel.findOne({email})
    if (!user) {
        return res.status(404).json({
            status: 'failed',
            message: 'User not found',
        });
    }

    const isPasswordValid = await user.checkPassword(req.body.password, user.password)

    if(!isPasswordValid){
        return res.status(401).json({
            status: 'failed',
            message: 'Invalid password',
        });
    }
    let name = user.name
    let userId = user._id
    let role = user.role

    const token = tokenCreation(user._id, name)
    console.log(token);



    res.status(200).json({
        status: 'success',
        name,
        token,
        role,
        userId,
        message: 'User Logged in'
    })
}

module.exports = {
    signup,
    loginUser
}