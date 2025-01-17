const Joi = require("joi");
const Form = require("../models/form.model");
const AppError = require("../utils/AppError");
const mongoose = require("mongoose");


const formControllers = {};

formControllers.create = async (req, res, next) => {
    try {
        const { body } = req;
        const schema = Joi.object({
            link: Joi.string().required(),
            title: Joi.string().required(),
            data: Joi.array().required(),
            active: Joi.boolean().optional().allow(null, ""),
        }).options({ abortEarly: false });
        const { error } = schema.validate(body);
        if (error) {
            return res.status(404).send(AppError(error.details[0].message))
        }
        const formCreate = await Form.create(body);
        return res.status(200).send({ success: true, message: "Form create successfully", data: formCreate })
    } catch (error) {
        console.log(error);
        return res.status(500).send(AppError(error?.errors && error?.errors[0]?.message) || error.message);
    }
}

formControllers.update = async (req, res, next) => {
    try {
        const { body } = req;
        const { id } = req?.params;
        const schema = Joi.object({
            title: Joi.string().optional().allow(null),
            data: Joi.array().optional().allow(null),
            active: Joi.boolean().optional().allow(null, ""),
        }).options({ abortEarly: false });
        const { error } = schema.validate(body);
        if (error) {
            return res.status(404).send(AppError(error.details[0].message))
        }
        const form_update = await Form.findByIdAndUpdate(id, body);
        return res.status(200).send({ success: true, message: "Form update successfully", data: form_update })
    } catch (error) {
        console.log(error);
        return res.status(500).send(AppError(error?.errors && error?.errors[0]?.message) || error.message);
    }
}

formControllers.findOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ success: false, message: "Invalid form ID" });
        }

        const form = await Form.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) },
            },
            {
                $lookup: {
                    from: "submit_forms",
                    localField: "_id",
                    foreignField: "form_id",
                    as: "submissions",
                },
            },
        ]);

        if (!form || form.length === 0) {
            return res.status(404).send({ success: false, message: "Form not found" });
        }

        return res.status(200).send({ success: true, message: "Form retrieved successfully", data: form[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ success: false, message: error.message });
    }
};

formControllers.findAll = async (req, res, next) => {
    try {
        // Use aggregation to fetch forms with their submission counts
        const forms = await Form.aggregate([
            {
                $lookup: {
                    from: "submit_forms",
                    localField: "_id",
                    foreignField: "form_id",
                    as: "submissions",
                },
            },
            {
                $addFields: {
                    submissionCount: { $size: "$submissions" },
                },
            },
            {
                $project: {
                    submissions: 0,
                },
            },
        ]);

        return res.status(200).send({
            success: true,
            message: "Forms fetched successfully",
            data: forms
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: error?.message || "An error occurred",
        });
    }
};

formControllers.delete = async (req, res, next) => {
    try {
        const { id } = req?.params;
        const form = await Form.findByIdAndDelete(id);
        return res.status(200).send({ success: true, message: "Form deleted successfully", data: form })
    } catch (error) {
        console.log(error);
        return res.status(500).send(AppError(error?.errors && error?.errors[0]?.message) || error.message);
    }
}

module.exports = formControllers;
