const Comment = require("../model/comment.model");
const crypto = require("crypto");

const createComment = async (req, res, next) => {
    try {
        let comment = req.body.comment;
        comment["comment_id"] = crypto.randomUUID();

        const commentRes = await new Comment(comment).save();

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
        const comments = await Comment.find({}, { _id: 0, __v: 0 });

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
            { comment_type: false },
            { _id: 0, __v: 0 }
        );

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
