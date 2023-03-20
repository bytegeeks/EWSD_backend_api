const mongoose = require("mongoose");

let postSchema = new mongoose.Schema(
    {
        post_id: { type: String },
        post_type: { type: String },
        post_content: { type: String },
        post_attachment: { type: String },
        post_date: { type: String },
        post_likes: { type: Number, default: 0 },
        post_dislikes: { type: Number, default: 0 },
        post_comment_count: { type: Number, default: 0 },
        post_view_count: { type: Number, default: 0 },
        dept_id: { type: String },
        user_id: { type: String },
        category_id: { type: String },
        academic_year_id: { type: String },
    },
    { collection: "post" }
);

module.exports = mongoose.model("post", postSchema);
