const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try{
        const userByUsername = await userModel.findOne({username: username});
        if(userByUsername)
            return res.status(409).send('User with the provided username already exists.');
        const userByEmail = await userModel.findOne({email: email});
        if(userByEmail)
            return res.status(409).send('User with the provided email already exists.');
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({username: username, email: email, password: hashedPassword});
        newUser.save();
        return res.status(201).send('User registered successfully.');
    }catch(err){
        console.log(err);
        res.status(500).send('Error registering user');
    }
});

module.exports = router;