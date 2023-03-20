const mongoose = require("mongoose");

let academicYearSchema = new mongoose.Schema(
    {
        academic_year_id: String,
        academic_year_name: String,
        start_date: String,
        closure_date: String,
        final_closure_date: String,
        active: Boolean,
    },
    { collection: "academic_year" }
);

module.exports = mongoose.model("academic_year", academicYearSchema);
