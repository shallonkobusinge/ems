const EmployeeController = require('../controllers/employee.controller');
const { verifiedToken } = require("../utils/token");
const BASE_URL = process.env.BASE_URL;


module.exports = (app) => {
    app.get(`${BASE_URL}/employee/user/:id`, verifiedToken, EmployeeController.findByUserId);
    app.get(`${BASE_URL}/employees`, verifiedToken, EmployeeController.getAll);
    app.post(`${BASE_URL}/employees`, verifiedToken, EmployeeController.create);
    app.get(`${BASE_URL}/employees/:id`, verifiedToken, EmployeeController.getOne);
    app.put(`${BASE_URL}/employees/:id`, verifiedToken, EmployeeController.update);
    app.delete(`${BASE_URL}/employees/:id`, verifiedToken, EmployeeController.delete);

}