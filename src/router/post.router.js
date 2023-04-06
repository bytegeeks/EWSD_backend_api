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

router.post("/view-my-post", authentication, PostController.viewMyPost);

router.post("/edit-post", authentication, PostController.editPost);

router.post("/like-post", authentication, PostController.likePost);

router.post("/dislike-post", authentication, PostController.dislikePost);

router.post("/get-post-count", authentication, PostController.getPostCount);

router.post(
    "/download-posts-csv",
    authentication,
    PostController.downloadPosts
);

router.post(
    "/download-attachments",
    authentication,
    PostController.downloadAttachments
);

module.exports = router;
