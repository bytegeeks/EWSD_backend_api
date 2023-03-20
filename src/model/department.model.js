const mongoose = require("mongoose");

let departmentSchema = new mongoose.Schema(
    {
        dept_id: { type: String },
        dept_name: { type: String },
    },
    { collection: "department" }
);

module.exports = mongoose.model("department", departmentSchema);
