const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const listingModel = require('../models/listing');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/:username', async (req, res) => {
    try{
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

router.post('/:username', async (req, res) => {
    try{
        const user = await userModel.findOne({username: req.params.username});
        if(!user)
            return res.status(404).send('Cannot create listing. User does not exist.');
        const dateListed = new Date();
        const dateExpires = createDateExpires(dateListed, req.body.listingLength);
        const newListing = new listingModel({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
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

router.put('/:username/:listingId', async (req, res) => {
    try{
        const user = await userModel.findOne({username: req.params.username});
        if(!user)
            return res.status(404).send('Could not edit listing. User does not exist.');
        const listing = await listingModel.findOne({_id: req.params.listingId});
        if(!listing)
            return res.status(404).send('Could not update listing. Listing does not exist.');
        const dateListed = listing.dateListed;
        const dateExpires = createDateExpires(dateListed, req.body.listingLength);
        await listingModel.updateOne({_id: listing._id}, {$set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            dateExpires: dateExpires,
            tags: req.body.tags
        }});
        res.status(204).send('Listing updated succesfully.');
    }catch(err){
        console.log(err);
        res.status(500).send('Error updating listing.');
    }
})

router.delete('/:username/:listingId', async (req, res) => {
    try{
        const user = await userModel.findOne({username: req.params.username});
        if(!user)
            return res.status(404).send('Could not delete listing. User does not exist.');
        const listing = await listingModel.findOne({_id: req.params.listingId});
        if(!listing)
            return res.status(404).send('Could not delete listing. Listing doees not exist.');
        await listingModel.deleteOne({_id: listing._id});
        res.status(204).send('Listing deleted successfully.');
    }catch(err){
        console.log(err);
        res.status(500).send('Error deleting listing.');
    }
})

const createDateExpires = (dateListed, daysExpiresIn) => {
    const dateExpires = new Date(dateListed);
    dateExpires.setDate(dateExpires.getDate() + daysExpiresIn);
    return dateExpires;
}

const sortTags = (req) => {
    let tags = req.query.tags.split(',');
    return tags.sort();
}

module.exports = router;