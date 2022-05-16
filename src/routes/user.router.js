const UserController = require("../controllers/user.controller");
module.exports = (app) => {
    const BASE_URL = process.env.BASE_URL;
    app.get(`${BASE_URL}/users`, UserController.getAll);
    app.get(`${BASE_URL}/users/:id`, UserController.getOne);
    app.post(`${BASE_URL}/users`, UserController.create);
    app.put(`${BASE_URL}/users/:id`, UserController.update);
    app.delete(`${BASE_URL}/users/:id`, UserController.delete);
}

