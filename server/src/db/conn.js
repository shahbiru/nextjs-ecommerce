const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI,{
    // useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connection successfull")
}).catch((e) => {
    console.log("error:::::",e)
})