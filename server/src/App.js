const express = require("express");
const bodyParser = require('body-parser');
require("./db/conn");
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const productRoutes = require("./routes/productRoutes")

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use("/api", authRoutes);
app.use("/api", productRoutes);

app.listen(port, () => {
  console.log(`connection setup on port ${port}`)
})


