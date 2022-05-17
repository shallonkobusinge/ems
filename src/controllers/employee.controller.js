const { Employee, ValidateEmployee } = require("../models/employee.model");
const { User } = require("../models/user.model");
const { SUCCESS_RESPONSE, ERROR_RESPONSE } = require("../utils/APIResponse");


exports.getAll = async (req, res) => {

    const employees = await Employee.paginate({}, { populate: ['user'] })
    return res.status(200).send(SUCCESS_RESPONSE(employees, "Employees retrieved successfully", 200));

}

exports.getOne = async (req, res) => {
    const employeeExists = await Employee.findOne({ _id: req.params.id }).populate('user');
    if (!employeeExists) {
        return res.status(404).send(ERROR_RESPONSE("Employee not found", 404));
    }
    return res.status(200).send(SUCCESS_RESPONSE(employeeExists, "Employee retrieved successfully", 200));

}
exports.create = async (req, res) => {

    const { error } = ValidateEmployee(req.body);
    if (error) {
        return res.status(400).send(ERROR_RESPONSE(null, error, 400));
    }
    const userExists = await User.findOne({
        _id: req.body.user
    })
    if (!userExists) {
        return res.status(400).send(ERROR_RESPONSE(null, "User does not exist", 400));
    }
    const employee = new Employee(req.body);
    await employee.save();
    return res.status(200).send(SUCCESS_RESPONSE(employee, "Employee created successfully", 200));


}
exports.update = async (req, res) => {

    let employeeExists = await Employee.findOne({ _id: req.params.id });
    if (!employeeExists) {
        return res.status(400).send(ERROR_RESPONSE(null, "Employee does not exist", 400));
    }
    const userExists = await User.findOne({
        _id: employeeExists.user
    })
    if (!userExists) {
        return res.status(400).send(ERROR_RESPONSE(null, "User does not exist", 400));
    }
    // const { error } = ValidateEmployee(req.body);
    // if (error) {
    //     return res.status(400).send(ERROR_RESPONSE(null, error, 400));
    // }
    employeeExists = Object.assign(employeeExists, req.body);
    await employeeExists.save();
    return res.status(200).send(SUCCESS_RESPONSE(employeeExists, "Employee updated successfully", 200));
}
exports.delete = async (req, res) => {
    const employeeExists = await Employee.findOne({
        _id: req.params.id
    })
    if (!employeeExists) {
        return res.status(400).send(ERROR_RESPONSE(null, "Employee does not exist", 400));
    }
    await Employee.findOneAndRemove({ _id: req.params.id });
    return res.status(200).send(SUCCESS_RESPONSE(null, "Employee deleted successfully", 200));

}