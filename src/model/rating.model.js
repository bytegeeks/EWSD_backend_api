const mongoose = require("mongoose");

let ratingSchema = new mongoose.Schema(
    {
        rating_id: { type: String },
        user_id: { type: String },
        post_id: { type: String },
        rating_type: { type: Boolean }, // true = like
    },
    { collection: "rating" }
);

module.exports = mongoose.model("rating", ratingSchema);
