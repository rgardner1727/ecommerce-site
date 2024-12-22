const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const listingModel = require('../models/listing');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/:username', authenticateToken, async (req, res) => {
    try{
        console.log(req.params.username);
        const user = await userModel.findOne({username: req.params.username});
        if(!user)
            return res.status(404).send('Could not find user.');
        const userListings = await listingModel.find({username: req.params.username});
        if(!userListings)
            return res.status(204).send('User has no listings.');
        return res.json(userListings);
    }catch(err){
        res.status(500).send('Error finding user.');
    }
})

router.post('/:username', authenticateToken, async (req, res) => {
    try{
        const user = await userModel.findOne({username: req.params.username});
        if(!user)
            return res.status(404).send('Cannot create listing. User does not exist.');
        const dateListed = new Date();
        const dateExpires = createDateExpires(dateListed, req.body.listingLength);
        const newListing = new listingModel({
            title: req.body.title,
            description: req.body.description,
            dateListed: dateListed,
            dateExpires: dateExpires,
            tags: req.body.tags,
            views: 0,
            username: req.params.username
        })
        newListing.save();
        res.status(201).send('Listing created successfully.');
    }catch(err){
        res.status(500).send('Error creating listing.');
    }
})

const createDateExpires = (dateListed, daysExpiresIn) => {
    const dateExpires = new Date(dateListed);
    dateExpires.setDate(dateExpires.getDate() + daysExpiresIn);
    return dateExpires;
}

module.exports = router;