const express = require('express');
const router = express.Router();
const listingModel = require('../models/listing');

router.get('/', async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        let listings = await listingModel.find()
            .skip((page - 1) * limit)
            .limit(limit);

        if(req.query.title)
            listings = filterByTitle(listings, req);
        if(req.query.minPrice)
            listings = filterByMinPrice(listings, req);
        if(req.query.maxPrice)
            listings = filterByMaxPrice(listings, req);
        if(req.query.tags)
            listings = filterByTags(listings, req);

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

const filterByTitle = (listings, req) => {
    const title = req.query.title;
    return listings.filter(listing => listing.title.includes(title));
}

const filterByMaxPrice = (listings, req) => {
    const maxPrice = req.query.maxPrice;
    return listings.filter(listing => listing.price <= maxPrice);
}

const filterByMinPrice = (listings, req) => {
    const minPrice = req.query.minPrice;
    return listings.filter(listing => listing.price >= minPrice);
}

const filterByTags = (listings, req) => {
    let filteredListings = [];
    const queryTags = req.query.tags.split(',').sort();
    for(const listing of listings){
        if(listing.tags.length === queryTags.length){
            if(compareEqualLengthArrays(listing.tags, queryTags))
                filteredListings.push(listing);
        }
        if(listing.tags.length > queryTags.length){
            if(compareUnequalLengthArrays(queryTags, listing.tags))
                filteredListings.push(listing);
        }
    }
    return filteredListings;
}

const compareEqualLengthArrays = (arr1, arr2) => {
    for(i = 0; i < arr1.length; i++){
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
}

const compareUnequalLengthArrays = (shortArr, longArr) => {
    for(i = 0; i < shortArr.length; i++){
        if(!longArr.includes(shortArr[i]))
            return false;
    }
    return true;
}

module.exports = router;