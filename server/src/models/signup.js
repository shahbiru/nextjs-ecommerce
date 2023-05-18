const mongoose = require("mongoose");
const validator = require("validator");

const registerSchema = new mongoose.Schema({
    name : {
        type : String,
        require: true,
        minlength: 3,
    },
    email: {
        type: String,
        rquired: true,
        unique: [true,"Email id already present"],
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Inavlid Email")
            }
        }
    },
    phone:{
        type: Number,
        min: 10,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        rquired: true,
    },
    password: {
        type: String,
        rquired: true,
        minlength:5,
        maxlength:10,

    }
})

const Signup = new mongoose.model('signup',registerSchema);
module.exports = Signup;