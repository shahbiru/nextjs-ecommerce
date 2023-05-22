const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const Router = require("./index")
require("./db/conn");
require('dotenv').config();

const app = express();
app.use(cors());
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use("/api", Router);

app.listen(port, () => {
  console.log(`connection setup on port ${port}`)
})
module.exports = app

