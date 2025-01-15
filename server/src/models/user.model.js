
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, require },
    password: { type: String, require },
}, {
    timestamps: true,
    versionKey: false,
})

UserSchema.pre("save", async function (next) {
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next;
});

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model("user", UserSchema);
