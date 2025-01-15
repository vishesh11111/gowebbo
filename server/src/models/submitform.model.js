const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        form_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "forms", // Reference to the 'forms' collection
        },
        data: {
            type: Object,
            required: true // Corrected typo from 'require' to 'required'
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

module.exports = mongoose.model("submit_forms", UserSchema);
