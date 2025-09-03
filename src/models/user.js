const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Not a valid Email")
            }
        }   
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password")
            }
        }
    },
    points: {
        type: Number,
        default: 0,
        min: 0
    }
})

module.exports = mongoose.model("User", userSchema)
