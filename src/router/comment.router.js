const router = require("express").Router();

const authentication = require("../utils/middleware/auth.middleware");
const CommentController = require("../controller/comment.controller");

router.post("/create-comment", authentication, CommentController.createComment);

router.post("/view-comment", authentication, CommentController.viewComment);

router.post(
    "/view-all-comments",
    authentication,
    CommentController.viewAllComments
);

router.post(
    "/view-anon-comments",
    authentication,
    CommentController.viewAnonComments
);

router.post(
    "/view-latest-comments",
    authentication,
    CommentController.viewLatestComments
);

router.post("/edit-comment", authentication, CommentController.editComment);

router.post("/delete-comment", authentication, CommentController.deleteComment);

module.exports = router;
