const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/signup');

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ data: user, message: 'success', token });
  } catch (ex) {
    next(ex);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { name, surname, email, password } = req.body;
    const usernameCheck = await User.findOne({ email });
    if (usernameCheck)
      return res.status(400).json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.status(400).json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await User.create({
      name,
      surname,
      email,
      password: hashedPassword,
    });
    return res.json({ status: 200, data });
  } catch (ex) {
    next(ex);
  }
};


