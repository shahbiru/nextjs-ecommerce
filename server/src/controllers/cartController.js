const Cart = require('../models/cart');
// const Product = require("../models/product")

exports.addCart = async (req, res) => {
    try {
        const { productId, userId, quantity } = req.body;
        const existingCart = await Cart.findOne({ productId, userId });
        if (existingCart) {
            existingCart.quantity += 1;
            await existingCart.save();
            res.status(200).json(existingCart);
        } else {
            const cartItem = new Cart({ productId, userId, quantity });
            const savedCartItem = await cartItem.save();
            res.status(201).json(savedCartItem);
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const cartItems = await Cart.find({userId: userId}).populate("productId");
        res.status(200).json({ userId, cartItems });
    } catch (error) {
        console.error('Error retrieving cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const cartItem = await Cart.findById(id);

        if (!cartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json(cartItem);
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
    
        // Find the cart item by ID and delete it
        const deletedCartItem = await Cart.findByIdAndDelete(id);
    
        // Check if the cart item was found and deleted
        if (!deletedCartItem) {
          return res.status(404).json({ message: 'Cart item not found' });
        }
    
        res.status(200).json({ message: 'Cart item deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
};