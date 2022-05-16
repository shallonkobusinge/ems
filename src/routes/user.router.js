const UserController = require("../controllers/user.controller");
module.exports = (app) => {
    const BASE_URL = process.env.BASE_URL;
    app.get(`${BASE_URL}/user/all`, UserController.getAll);
}