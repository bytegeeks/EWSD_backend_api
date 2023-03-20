const router = require("express").Router();

const authentication = require("../utils/middleware/auth.middleware");
const PostController = require("../controller/post.controller");

router.post("/create-post", authentication, PostController.createPost);

router.post("/view-post", authentication, PostController.viewPost);

router.post("/view-all-post", authentication, PostController.viewAllPost);

router.post(
    "/view-popular-post",
    authentication,
    PostController.viewPopularPost
);

router.post(
    "/view-most-viewed-post",
    authentication,
    PostController.viewMostViewedPost
);

router.post("/view-latest-post", authentication, PostController.viewLatestPost);

router.post("/edit-post", authentication, PostController.editPost);

router.post("/like-post", authentication, PostController.likePost);

router.post("/remove-like-post", authentication, PostController.removeLikePost);

router.post("/dislike-post", authentication, PostController.dislikePost);

router.post(
    "/remove-dislike-post",
    authentication,
    PostController.removeDislikePost
);

module.exports = router;
