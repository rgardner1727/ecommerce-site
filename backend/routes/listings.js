const express = require('express');
const router = express.Router();
const listingModel = require('../models/listing');

router.get('/', async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        let tags = req.query.tags;
        if(tags)
            tags = tags.split(',');
        const listings = await listingModel.find({tags: {$in: tags}})
            .skip((page - 1) * limit)
            .limit(limit);
        const totalListings = await listingModel.countDocuments();
        const totalPages = Math.ceil(totalListings / limit);
        res.json({
            page, 
            limit, 
            listings,
            totalListings,
            totalPages
        })
    }catch(err){
        console.log(err);
        res.status(500).send('Error retrieving listings.');
    }
})

router.get('/findByTags', async (req, res) => {
    try{
        const tags = req.query.tags.split(',');
        console.log(tags);
        const listingsByTag = await listingModel.find({tags: {$in: tags}});
        res.status(200).send(listingsByTag);
    }catch(err){
        console.log(err);
        res.status(500).send('Server error.');
    }
})

module.exports = router;