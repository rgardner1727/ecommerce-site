const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const {usernameOrEmail, password} = req.body;
    try{
        let user = await userModel.findOne({username: usernameOrEmail});
        if(!user)
            user = await userModel.findOne({email: usernameOrEmail});
        if(!user)
            return res.status(404).send('User with username or email does not exist.');
        const matches = await bcrypt.compare(password, user.password);
        if(!matches)
            return res.status(401).send('Invalid credentials provided.');
        const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: '30m'});
        return res.status(201).json({token});
    }catch(err){
        console.log(err);
        res.status(500).send('Error logging in.');
    }
});

module.exports = router;