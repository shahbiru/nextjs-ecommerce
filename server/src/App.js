const express = require("express");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
require("./db/conn");
require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('./models/signup');

const Signup = require("./models/signup");
const routes = require('./routes/authRoutes')

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get("/", (req,res) => {
  res.status(200).send("Hello from other side");
})

app.post("/signup",(req,res) => {
  const token = jwt.sign({ _id: Signup._id }, process.env.JWT_SECRET);
  const user = new Signup(req.body)
  user.save().then(() => {
    res.status(200).send({ message: "User registered successfully!" })
  }).catch((e) => {
    res.status(400).send(e)
  })
})

// app.post("/signin",async (req,res) => {
//   const { email, password } = req.body;
 
//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials email' });
//     }

//     bcrypt.hash('password', 10, function(err, hash) {
  
//       bcrypt.compare('password', hash, function(err, result) {
//           if (err) { throw (err); }
//           console.log("result",result);
//       });
//   });

//     // Check if password is correct
//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log(password,user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials pass' });
//     }

//     // Generate a JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// })

app.use('/',routes);

app.listen(port, () => {
  console.log(`connection setup on port ${port}`)
})


