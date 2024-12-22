const mongoose = require('mongoose');
const schema = mongoose.Schema;

const listing = new schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    dateListed: {type: Date, required: true},
    dateExpires: {type: Date, required: true},
    tags: {type: [String], required: false},
    views: {type: Number, required: true},
    username: {type: String, required: true}
})

module.exports = mongoose.model('listingModel', listing);