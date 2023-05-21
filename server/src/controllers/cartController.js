const Cart = require('../models/cart');
const Product = require("../models/product")

exports.addCart = async (req, res) => {
    try {
        const { userId, productId, quantity,price } = req.body;

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

        console.log(cart.totalPrice)
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.items.push({ productId, quantity });
            cart.totalPrice = price
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
        const userId = req.params.id;
        const cartItems = await Cart.find({ userId: userId }).populate("items.productId");
        res.status(200).json({ cartItems });
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
        const userId = req.user.id
        // Find the cart item by ID and delete it
        let cart = await Cart.findOne({ userId });

        const cartItem = cart.items.find((item) => item.productId.equals(id));
        const deletedCartItem = await cartItem.findByIdAndDelete(id);
        // Check if the cart item was found and deleted
        if (!deletedCartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};