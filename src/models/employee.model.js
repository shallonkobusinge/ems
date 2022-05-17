const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectId')(Joi);
const { User } = require("../models/user.model");
const pagination = require("mongoose-paginate-v2");
var depopulate = require('mongoose-deep-populate')(mongoose);
const { EDepartments } = require("../utils/common.util");


const EmployeeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    department: {
        type: String,
        enum: EDepartments,
        required: true,
    }
}, {
    timestamps: true
})


EmployeeSchema.plugin(pagination);
EmployeeSchema.plugin(depopulate);
exports.Employee = mongoose.model("Employee", EmployeeSchema);

exports.ValidateEmployee = (employee) => {
    const schema = Joi.object({
        user: Joi.objectId().required(),
        department: Joi.string().required(),
    })
    return schema.validate(employee);
}

