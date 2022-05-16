const { User, validateUser } = require("../models/user.model");
const { SUCCESS_RESPONSE, ERROR_RESPONSE } = require("../utils/APIResponse");
const bcrypt = require("bcrypt");
exports.getAll = async (req, res) => {
    const all = await User.paginate()
    return res.status(200).send(SUCCESS_RESPONSE(all, "Retrieved all users", 200));
}

exports.create = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).send(ERROR_RESPONSE(null, error, 400));
    }
    const existingUser = await User.findOne({
        $or: [
            { email: req.body.email },
            { username: req.body.username }
        ]
    }
    );
    if (existingUser) {
        res.status(400).send(ERROR_RESPONSE(null, `User with email of ${existingUser.email} or username ${existingUser.username} already exists`, 400));
        return;
    }
    req.body.password = await bcrypt.hash(
        req.body.password,
        Number(process.env.SECRET_HASH
        ))
    const user = new User(req.body);
    await user.save();
    return res.status(201).send(SUCCESS_RESPONSE(user, "User created", 201));

}

exports.getOne = async (req, res) => {

    const user = await User.findOne({
        _id: req.params.id
    });
    if (!user) {
        return res.status(404).send(ERROR_RESPONSE("User not found", "Invalid request", 404));
    }
    return res.status(200).send(SUCCESS_RESPONSE(user, "Retrieved user", 200));

}

exports.update = async (req, res) => {
    let existingUser = await User.findOne({
        _id: req.params.id
    });
    if (!existingUser) {
        return res.status(404).send(ERROR_RESPONSE(null, "User not found", 404));
    }
    const sameUser = await User.findOne({
        _id: {
            $ne: req.params.id
        },
        $or: [
            { email: req.body.email },
            { username: req.body.username }
        ]
    })
    // if (!sameUser) {
    //     return res.status(404).send(ERROR_RESPONSE(null, `User with the email ${req.body.email} or username ${req.body.username} doesn't already exists`, 404));
    // }
    if (req.body.password) {
        req.body.password = await bcrypt.hash(
            req.body.password,
            Number(process.env.SECRET_HASH)
        )
    }
    existingUser = Object.assign(existingUser, req.body);
    const updateUser = await existingUser.save();
    return res.status(200).send(SUCCESS_RESPONSE(updateUser, "User updated", 200));

}

exports.delete = async (req, res) => {

    const existingUser = await User.findOne({
        _id: req.params.id
    })
    if (!existingUser) {
        return res.status(404).send(ERROR_RESPONSE("User not found", "Invalid request", 404))
    }
    await existingUser.remove();
    return res.status(200).send(SUCCESS_RESPONSE(null, "User deleted", 200));
}
