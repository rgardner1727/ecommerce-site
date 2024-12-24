const express = require('express');
const router = express.Router();
const userModel = require('../models/user');
const listingModel = require('../models/listing');
const userCartModel = require('../models/userCart');

router.get('/:username', async (req, res) => {
    try{
        const user = await userModel.findOne({username: req.params.username});
        if(!user)
            return res.status(404).send('Could not retrieve cart. User does not exist.');
        const cart = await userCartModel.findOne({username: user.username});
        if(!cart)
            return res.status(404).send('Cart is empty. Add items to the cart to view them.');
        const cartItemIds = cart.cartItems;
        const cartItems = await Promise.all(cartItemIds.map(async (itemId) => {
            const cartItem = await listingModel.findOne({_id: itemId});
            return cartItem;
        }))
        res.json(cartItems);
    }catch(err){
        console.log(err);
        res.status(500).send('Error retrieving cart.');
    }
});

router.post('/:username', async (req, res) => {
    try{
        const user = await userModel.findOne({username: req.params.username});
        if(!user)
            return res.status(404).send('Could not add to cart. User does not exist.');
        const cart = await userCartModel.findOne({username: user.username});
        if(!cart){
            const newCart = new userCartModel({
                username: user.username,
                cartItems: [req.body.itemId]
            })
            newCart.save();
            res.status(201).send('Cart created and item added.');
        }else{
            const cartItems = cart.cartItems;
            if(cartItems.includes(req.body.itemId))
                return res.status(204).send('Item already in cart.');
            await userCartModel.updateOne({username: user.username}, {$push: {cartItems: req.body.itemId}});
            res.status(201).send('Cart updated.');
        }
    }catch(err){
        console.log(err);
        res.status(500).send('Error adding to cart.');
    }
})

module.exports = router;