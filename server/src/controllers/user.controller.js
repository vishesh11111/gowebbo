
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Joi = require('joi');
const AppError = require("../utils/AppError");



let userController = {};

const newToken = (user) => {
    // return jwt.sign({ user }, process.env.scret);
    return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
};

userController.Register = async (req, res) => {
    try {
        const { body } = req;
        const schema = Joi.object({
            email: Joi.string().email().required(),
            name: Joi.string().required(),
            password: Joi.string().required().min(5)
        }).options({ abortEarly: false });
        const { error } = schema.validate(body);
        if (error) {
            return res.status(404).send(AppError(error.details[0].message))
        }

        const checkUser = await User.findOne({ email: body?.email });
        if (checkUser) {
            res.status(400).json({ status: false, message: "User already exist please login" })
        } else {
            const createUser = await User.create(body);
            res.status(200).json({ status: true, message: "User create successfully", data: createUser })
        }
    } catch (error) {
        return res.status(500).send(AppError(error?.errors && error?.errors[0]?.message) || error.message);
    }
}

userController.login = async (req, res, next) => {
    try {
        let body = req.body;
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }).options({ abortEarly: false });

        const { error } = schema.validate(body);
        if (error) {
            return res.status(404).send(AppError(error.details[0].message))
        }

        const user = await User.findOne({ 'email': body.email });
        if (user) {
            const matchPas = await user.matchPassword(body.password);
            if (!matchPas) {
                res.status(400).send({ status: false, message: "Check Email or Password" })
            } else {
                const token = newToken(user);
                res.status(200).json({ status: true, message: "Login successfully", data: user, token: token })
            }
        } else {
            res.status(400).send({ status: false, message: "Please register" })
        }
    } catch (error) {
        return res.status(500).send(AppError(error?.errors && error?.errors[0]?.message) || error.message);
    }
}

module.exports = userController;