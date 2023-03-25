const mongoose = require("mongoose");

let postSchema = new mongoose.Schema(
    {
        post_id: { type: String },
        post_type: { type: Boolean },
        post_content: { type: String },
        post_attachment: { type: String },
        post_date: { type: String },
        post_likes: [String],
        post_dislikes: [String],
        post_comment_count: { type: Number, default: 0 },
        post_view_count: { type: Number, default: 0 },
        dept_name: { type: String },
        user_id: { type: String },
        username: { type: String },
        category_name: { type: String },
        academic_year_name: { type: String },
    },
    { collection: "post" }
);

module.exports = mongoose.model("post", postSchema);
