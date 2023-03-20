const mongoose = require("mongoose");

let commentSchema = new mongoose.Schema(
    {
        comment_id: { type: String },
        comment_content: { type: String },
        comment_type: { type: Boolean }, // false = anon
        comment_date: { type: String },
        user_id: { type: String },
        post_id: { type: String },
    },
    { collection: "comment" }
);

module.exports = mongoose.model("comment", commentSchema);
