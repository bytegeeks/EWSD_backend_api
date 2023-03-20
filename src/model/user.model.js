const mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
    {
        user_id: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique: true },
        user_dob: String,
        user_gender: String,
        user_phone: String,
        user_address: String,
        user_email: String,
        user_password: String,
        user_role_id: String,
        user_dept_id: String,
    },
    { collection: "user" }
);

module.exports = mongoose.model("user", userSchema);
