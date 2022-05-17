const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
Joi.objectId = require('joi-objectid')(Joi);
const pagination = require("mongoose-paginate-v2")

const UserSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        minlength: 3,

    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    username: {
        type: String,

    },
    phone: {
        type: String,

    }
}, {
    timestamps: true,
})

UserSchema.plugin(pagination)

exports.User = mongoose.model("User", UserSchema);

exports.validateUser = function (user) {
    const schema = Joi.object({
        fname: Joi.string().min(3).required(),
        lname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
        isAdmin: Joi.boolean(),
        username: Joi.string(),
        phone: Joi.string(),
    })
    return schema.validate(user);
}

exports.validateLogin = function (user) {
    const schema = Joi.object({
        email: Joi.string().email(),
        username: Joi.string(),
        phone: Joi.string(),
        password: Joi.string().min(3),
    })
    return schema.validate(user);
}


exports.generateToken = async (user) => {
    const token = jwt.sign({
        userId: user._id,
        firstName: user.fname,
        lastName: user.lname,
        email: user.email,
        isAdmin: user.isAdmin,
        username: user.username,
        phone: user.phone,
    },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '12h' }
    )
    return token;

}