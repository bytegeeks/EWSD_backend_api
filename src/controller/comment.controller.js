const Comment = require("../model/comment.model");
const Post = require("../model/post.model");
const User = require("../model/user.model");
const crypto = require("crypto");
const sendEmail = require("../utils/email.util");

const createComment = async (req, res, next) => {
    try {
        let comment = req.body.comment;
        comment["comment_id"] = crypto.randomUUID();

        const post_id = comment.post_id;

        const post = await Post.findOne({ post_id: post_id });

        if (post) {
            const post_owner_user_id = post.user_id;
            const post_owner = await User.findOne({
                user_id: post_owner_user_id,
            });

            if (post_owner) {
                const post_owner_email = post_owner.user_email;
                if (post_owner_email) {
                    try {
                        sendEmail(
                            post_owner_email,
                            "SOMEONE COMMENTED ON YOUR POST",
                            `Someone commented ${comment.comment_content} on your post.`
                        );
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }

        const commentRes = await new Comment(comment).save();
        await Post.findOneAndUpdate(
            { post_id: post_id },
            { $inc: {post_comment_count: 1} }
        );

        if (commentRes) {
            return res.status(201).send({
                status: true,
                message: "comment create success",
                data: commentRes,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "comment create failed",
            });
        }
    } catch (error) {
        next(error);
    }
};

const viewComment = async (req, res, next) => {
    try {
        let comment_id = req.body.comment_id;
        const comment = await Comment.findOne(
            { comment_id },
            { _id: 0, __v: 0 }
        );

        if (comment) {
            return res.status(200).send({
                status: true,
                message: "comment fetch successful",
                data: comment,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "comment fetch failed",
            });
        }
    } catch (error) {
        next(error);
    }
};

const viewAllComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({}, { _id: 0, __v: 0 }).sort({
            comment_date: -1,
        });

        if (comments) {
            return res.status(200).send({
                status: true,
                message: "comments fetch successful",
                data: comments,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "comments fetch failed",
            });
        }
    } catch (error) {
        next(error);
    }
};

const viewAnonComments = async (req, res, next) => {
    try {
        const comments = await Comment.find(
            { comment_type: true },
            { _id: 0, __v: 0 }
        ).sort({ comment_date: -1 });

        if (comments) {
            return res.status(200).send({
                status: true,
                message: "comments fetch successful",
                data: comments,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "comments fetch failed",
            });
        }
    } catch (error) {
        next(error);
    }
};

const viewLatestComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({}, { _id: 0, __v: 0 }).sort({
            comment_date: -1,
        });
        if (comments) {
            return res.status(200).send({
                status: true,
                message: "comments fetched successfully",
                data: comments,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "comments fetch fail",
            });
        }
    } catch (error) {
        next(error);
    }
};

const editComment = async (req, res, next) => {
    try {
        let comment_id = req.body.comment_id;
        let new_comment_params = req.body.comment;

        const result = await Comment.findOneAndUpdate(
            { comment_id },
            new_comment_params
        );

        if (result) {
            return res.status(200).send({
                status: true,
                message: "comment update success",
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "comment update fail",
            });
        }
    } catch (error) {
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        let comment_id = req.body.comment_id;

        const result = await Comment.findOneAndDelete({ comment_id });

        if (result) {
            return res.status(200).send({
                status: true,
                message: "comment delete success",
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "comment delete fail",
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createComment,
    viewComment,
    viewAllComments,
    viewAnonComments,
    viewLatestComments,
    editComment,
    deleteComment,
};
