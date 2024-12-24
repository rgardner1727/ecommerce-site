const mongoose = require('mongoose');
const schema = mongoose.Schema;
const listingModel = require('./listing');

const userCart = new schema({
    username: {type: String, required: true},
    cartItems: {type: [String], require: true}
})

module.exports = mongoose.model('userCartModel', userCart);