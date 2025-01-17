const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        link: { type: String },
        data: {
            type: Array,
            required: true
        },
        active: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("forms", FormSchema);
