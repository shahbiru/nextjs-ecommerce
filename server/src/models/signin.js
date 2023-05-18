const mongoose = require('mongoose');

const SigninSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

const Signin = mongoose.model('signin', SigninSchema);

module.exports = Signin;
