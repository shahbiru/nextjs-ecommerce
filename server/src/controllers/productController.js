const Product = require('../models/product');

exports.createProduct = async (req, res) => {
  try {
    const { name, brand, price, image } = req.body;

    const product = new Product({ name, brand, price, image });
    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};