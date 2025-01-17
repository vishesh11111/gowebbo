const Joi = require("joi");
const Form_submit = require("../models/submitform.model");
const Form = require("../models/form.model");
const AppError = require("../utils/AppError");


const formControllers = {};

formControllers.create = async (req, res, next) => {
    try {
        const { form_id } = req?.params;
        const { body } = req;
        const schema = Joi.object({
            data: Joi.object().required(),
            active: Joi.boolean().optional().allow(null, ""),
        }).options({ abortEarly: false });
        const { error } = schema.validate(body);
        if (error) {
            return res.status(404).send(AppError(error.details[0].message))
        }

        const getForm = await Form.findOne({ link: form_id });
        if (!getForm) {
            return res.status(404).send(AppError("Form not found"))
        }
        const form_submission_Create = await Form_submit.create({ ...body, form_id: getForm?._id });
        return res.status(200).send({ success: true, message: "Form submit successfully", data: form_submission_Create })
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
            data: Joi.array().optional().allow(null),
            active: Joi.boolean().optional().allow(null, ""),
        }).options({ abortEarly: false });
        const { error } = schema.validate(body);
        if (error) {
            return res.status(404).send(AppError(error.details[0].message))
        }
        const form_update = await Form_submit.findByIdAndUpdate(id, body);
        return res.status(200).send({ success: true, message: "Form update successfully", data: form_update })
    } catch (error) {
        console.log(error);
        return res.status(500).send(AppError(error?.errors && error?.errors[0]?.message) || error.message);
    }
}

// formControllers.findOne = async (req, res, next) => {
//     try {
//         const { body } = req;
//         const { id } = req?.params;
//         const form = await Form.findById(id);
//         return res.status(200).send({ success: true, message: "Form update successfully", data: form })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send(AppError(error?.errors && error?.errors[0]?.message) || error.message);
//     }
// }

// formControllers.findAll = async (req, res, next) => {
//     try {
//         const { body } = req;
//         const { id } = req?.params;
//         const form = await Form.find(id).lean();
//         return res.status(200).send({ success: true, message: "Form get successfully", data: form })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send(AppError(error?.errors && error?.errors[0]?.message) || error.message);
//     }
// }


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
