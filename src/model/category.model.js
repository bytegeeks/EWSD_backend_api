const mongoose = require("mongoose");

let categorySchema = new mongoose.Schema(
    {
        category_id: { type: String },
        category_name: { type: String },
    },
    { collection: "category" }
);

module.exports = mongoose.model("category", categorySchema);
