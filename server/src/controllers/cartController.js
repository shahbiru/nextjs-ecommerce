const Cart = require('../models/cart');
const Product = require("../models/product")

exports.addCart = async (req, res) => {
    try {
        const { userId, productId, quantity, price } = req.body;

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
            cartItem.quantity += 1;
            cart.totalPrice += price
        } else {
            cart.items.push({ productId, quantity });
            cart.totalPrice += price
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
        const { userId, productId, quantity } = req.body;
        // Find the cart based on the userId
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Find the cart item by productId
        const cartItem = cart.items.find((item) => item.productId.toString() === productId);

        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        // Find the product to get the price
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Calculate the change in quantity
        const quantityChange = quantity - cartItem.quantity;

        // Update the quantity and calculate the new total price
        cartItem.quantity = quantity;
        cart.totalPrice += quantityChange * product.price;
        await cart.save();

        res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const itemId = req.params.id;

        // Find the user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the index of the item in the cart
        const itemIndex = cart.items.findIndex((item) => item.productId.equals(itemId));
        const productPrice = await Product.findById(itemId);

        cart.totalPrice -= productPrice.price;
        cart.items = cart.items.filter(item => item.productId !== itemId);

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Remove the item from the cart
        cart.items.splice(itemIndex, 1);

        // Save the cart
        await cart.save();

        res.json(cart);
    } catch (error) {
        console.error('Error deleting item from cart', error);
        res.status(500).json({ message: 'An error occurred' });
    }
};