const mongoose = require("mongoose");
const validator = require("validator");

const registerSchema = new mongoose.Schema({
    name : {
        type : String,
        require: true,
        minlength: 3,
    },
    surname: {
        type: String,
        rquired: true,
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
    password: {
        type: String,
        rquired: true,
        minlength: 8,
    }
})

const Signup = new mongoose.model('signup',registerSchema);
module.exports = Signup;