const Post = require("../model/post.model");
const Rating = require("../model/rating.model");
const crypto = require("crypto");
const { parse } = require("json2csv");
const fs = require("fs");
const child_process = require("child_process");
const _ = require("lodash");
const AcademicYear = require("../model/academicYear.model");
const User = require("../model/user.model");
const sendEmail = require("../utils/email.util");
const Role = require("../utils/fixtures/role.enum");

const getPostCount = async (req, res, next) => {
    try {
        const posts = await Post.find({}, { _id: 0, __v: 0 });
        if (posts) {
            return res.status(200).send({
                status: true,
                message: "post count retrieved successfully",
                post_count: posts.length,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "post count fetch fail",
            });
        }
    } catch (error) {
        next(error);
    }
};

const likePost = async (req, res, next) => {
    try {
        await Post.updateOne(
            { post_id: req.body.post_id },
            { $pull: { post_dislikes: req.body.user_id } }
        );

        await Post.updateOne(
            { post_id: req.body.post_id },
            { $pull: { post_likes: req.body.user_id } }
        );

        const result = await Post.updateOne(
            { post_id: req.body.post_id },
            { $push: { post_likes: req.body.user_id } }
        );
        if (result) {
            return res.status(200).send({
                status: true,
                message: "like added successfully",
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "like added fail",
            });
        }
    } catch (error) {
        next(error);
    }
};

// const removeLikePost = async (req, res, next) => {
//     try {
//         const user_id = req.body.user_id;
//         const post_id = req.body.post_id;

//         const ratingRes = await Rating.findOneAndDelete({ user_id, post_id });

//         if (ratingRes) {
//             const result = await Post.findOneAndUpdate(
//                 { post_id },
//                 { $inc: { post_likes: -1 } }
//             );
//             if (result) {
//                 return res.status(200).send({
//                     status: true,
//                     message: "like removed successfully",
//                 });
//             } else {
//                 return res.status(400).send({
//                     status: false,
//                     message: "like removed fail",
//                 });
//             }
//         } else {
//             return res.status(400).send({
//                 status: false,
//                 message: "like removed fail",
//             });
//         }
//     } catch (error) {
//         next(error);
//     }
// };

const dislikePost = async (req, res, next) => {
    try {
        await Post.updateOne(
            { post_id: req.body.post_id },
            { $pull: { post_likes: req.body.user_id } }
        );

        await Post.updateOne(
            { post_id: req.body.post_id },
            { $pull: { post_dislikes: req.body.user_id } }
        );

        const result = await Post.updateOne(
            { post_id: req.body.post_id },
            { $push: { post_dislikes: req.body.user_id } }
        );
        if (result) {
            return res.status(200).send({
                status: true,
                message: "dislike added successfully",
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "dislike added fail",
            });
        }
    } catch (error) {
        next(error);
    }
};

// const removeDislikePost = async (req, res, next) => {
//     try {
//         const user_id = req.body.user_id;
//         const post_id = req.body.post_id;

//         const ratingRes = await Rating.findOneAndDelete({ user_id, post_id });

//         if (ratingRes) {
//             const result = await Post.findOneAndUpdate(
//                 { post_id },
//                 { $inc: { post_dislikes: -1 } }
//             );
//             if (result) {
//                 return res.status(200).send({
//                     status: true,
//                     message: "dislike removed successfully",
//                 });
//             } else {
//                 return res.status(400).send({
//                     status: false,
//                     message: "dislike removed fail",
//                 });
//             }
//         } else {
//             return res.status(400).send({
//                 status: false,
//                 message: "dislike removed fail",
//             });
//         }
//     } catch (error) {
//         next(error);
//     }
// };

const createPost = async (req, res, next) => {
    try {
        let post = req.body.post;

        post["post_id"] = crypto.randomUUID();
        post["user_id"] = req.body.user_id;

        const postRes = await new Post(post).save();

        if (postRes) {
            // get list of qa coordinators
            const qaCoor = await User.find({
                user_role_id: Role.QA_COORDINATOR,
            });
            if (qaCoor) {
                for (let i = 0; i < qaCoor.length; i++) {
                    const qaEmail = qaCoor[i].user_email;
                    if (qaEmail) {
                        try {
                            sendEmail(
                                qaEmail,
                                "NEW IDEA POST SUBMISSION",
                                `A user with user ID ${post["user_id"]} submitted an idea post!`
                            );
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            }
            return res.status(201).send({
                status: true,
                message: "post create success",
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "post create failed",
            });
        }
    } catch (error) {
        next(error);
    }
};

const viewPost = async (req, res, next) => {
    try {
        const post_id = req.body.post_id;

        const post = await Post.findOne(
            { post_id: post_id },
            { _id: 0, __v: 0 }
        );

        if (post) {
            return res.status(200).send({
                status: true,
                message: "post fetched successfully",
                data: post,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "post fetch fail",
            });
        }
    } catch (error) {
        next(error);
    }
};

const viewMyPost = async (req, res, next) => {
    try {
        const posts = await Post.find(
            { user_id: req.body.user_id },
            { _id: 0, __v: 0 }
        ).sort({
            post_date: -1,
        });

        if (posts) {
            return res.status(200).send({
                status: true,
                message: "post fetched successfully",
                data: posts,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "posts fetch failed",
            });
        }
    } catch (error) {}
};

const viewAllPost = async (req, res, next) => {
    // todo: add pagination
    // {
    //     skip:0, // Starting Row
    //     limit:10, // Ending Row
    //     sort:{
    //         date_added: -1 //Sort by Date Added DESC
    //     }
    // },
    try {
        const posts = await Post.find({}, { _id: 0, __v: 0 }).sort({
            post_date: -1,
        });
        if (posts) {
            return res.status(200).send({
                status: true,
                message: "posts fetched successfully",
                data: posts,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "posts fetch fail",
            });
        }
    } catch (error) {
        next(error);
    }
};

const viewPopularPost = async (req, res, next) => {
    try {
        const posts = await Post.find({}, { _id: 0, __v: 0 }).sort({
            post_likes: -1,
            post_comment_count: -1,
        });
        if (posts) {
            return res.status(200).send({
                status: true,
                message: "posts fetched successfully",
                data: posts,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "posts fetch fail",
            });
        }
    } catch (error) {
        next(error);
    }
};

const viewMostViewedPost = async (req, res, next) => {
    try {
        const posts = await Post.find({}, { _id: 0, __v: 0 }).sort({
            post_view_count: -1,
        });
        if (posts) {
            return res.status(200).send({
                status: true,
                message: "posts fetched successfully",
                data: posts,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "posts fetch fail",
            });
        }
    } catch (error) {
        next(error);
    }
};

const viewLatestPost = async (req, res, next) => {
    try {
        const posts = await Post.find({}, { _id: 0, __v: 0 }).sort({
            post_date: -1,
        });
        if (posts) {
            return res.status(200).send({
                status: true,
                message: "posts fetched successfully",
                data: posts,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "posts fetch fail",
            });
        }
    } catch (error) {
        next(error);
    }
};

const editPost = async (req, res, next) => {
    try {
        let post_id = req.body.post_id;
        let new_post_params = req.body.post;

        const result = await Post.findOneAndUpdate(
            { post_id },
            new_post_params
        );

        if (result) {
            return res.status(200).send({
                status: true,
                message: "post update success",
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "post update fail",
            });
        }
    } catch (error) {
        next(error);
    }
};

const downloadAttachments = async (req, res, next) => {
    const folderPath = "public/upload";
    child_process.execSync("zip -r archive *", { cwd: folderPath });

    res.download(folderPath + "/archive.zip");
};

const downloadPosts = async (req, res, next) => {
    try {
        // const academicYearStart = req.body.academicYearStart;
        // const academicYearEnd = req.body.academicYearEnd;

        // console.log(new Date(Date.parse(academicYearStart)));
        // console.log(new Date(Date.parse(academicYearEnd)));

        const latestActiveAcademicYear = await AcademicYear.findOne(
            {
                active: true,
            },
            { __v: 0, _id: 0 }
        );

        let posts = await Post.find({});

        console.log(posts);

        if (posts.length > 0) {
            posts.filter((p) => {
                let str = p.post_date.split(" ")[0].split("/");
                let str2 = `${str[2].replace(",", "")}-${str[1]}-${str[0]}`;
                let tp = Date.parse(str2);
                let ts = Date.parse(latestActiveAcademicYear.start_date);
                let te = Date.parse(latestActiveAcademicYear.closure_date);

                return tp >= ts && tp < te;
            });
            const csv = parse(
                posts.map((p) => {
                    return _.omit(p._doc, [
                        "__v",
                        "_id",
                        "post_comment_count",
                        "post_view_count",
                    ]);
                })
            );
            const csv_file_name = "idea_posts_" + "_" + Date.now() + ".csv";

            // console.log(csv);

            fs.writeFileSync(csv_file_name, csv);

            return res.download(csv_file_name);
        } else {
            return res.send({ status: false, message: "no posts found" });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPost,
    viewPost,
    viewAllPost,
    viewPopularPost,
    viewMostViewedPost,
    viewLatestPost,
    editPost,
    likePost,
    dislikePost,
    getPostCount,
    viewMyPost,
    downloadPosts,
    downloadAttachments,
};
