const Cart = require('../models/cart');
const Product = require("../models/product")

exports.addCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
    
        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
    
        // Check if the user's cart exists
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            // Create a new cart if it doesn't exist
            cart = new Cart({ userId, items: [] });
        }
    
        // Check if the product is already in the cart
        const cartItem = cart.items.find((item) => item.productId.equals(productId));
        if (cartItem) {
            // Update the quantity if the product is already in the cart
            cartItem.quantity += 1;

        } else {
            // Add a new item to the cart
            cart.items.push({ productId, quantity });
        }
    
        // Save the cart
        await cart.save();
    
        res.json(cart);
        }
    catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getCart = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log(userId)
        const cartItems = await Cart.find({userId: userId}).populate("items.productId");
        console.log(cartItems)
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