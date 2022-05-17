const EmployeeController = require('../controllers/employee.controller');

module.exports = (app) => {
    const BASE_URL = process.env.BASE_URL;
    app.get(`${BASE_URL}/employees`, EmployeeController.getAll);
    app.post(`${BASE_URL}/employees`, EmployeeController.create);
    app.get(`${BASE_URL}/employees/:id`, EmployeeController.getOne);
    app.put(`${BASE_URL}/employees/:id`, EmployeeController.update);
    app.delete(`${BASE_URL}/employees/:id`, EmployeeController.delete);

}