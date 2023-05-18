const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  price:{
    type: Number,
    require: true,
  },
  image:{
    type:String,
    require: true,
  }
}, {
  timestamps: true
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;
