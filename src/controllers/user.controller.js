const { User } = require("../models/user.model");
exports.getAll = async (req, res) => {

    const all = await User.paginate()
    res.json({ success: true, message: "Retrieved successfully ", all });

}