const Department = require("../model/department.model");
const Post = require("../model/post.model");
const crypto = require("crypto");

const getDepartmentCount = async (req, res, next) => {
    try {
        const departments = await Department.find({}, { _id: 0, __v: 0 });
        if (departments) {
            return res.status(200).send({
                status: true,
                message: "department count retrieved successfully",
                department_count: departments.length,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "department count fetch fail",
            });
        }
    } catch (error) {
        next(error);
    }
};

const createDepartment = async (req, res, next) => {
    try {
        let dept = req.body.dept;
        let dept_name = dept.dept_name;
        const dept_name_exists = await Department.findOne(
            {
                dept_name: dept_name,
            },
            { _id: 0, __v: 0 }
        );

        if (!dept_name_exists) {
            dept["dept_id"] = crypto.randomUUID();
            const deptRes = await new Department(dept).save();

            if (deptRes) {
                return res.status(201).send({
                    status: true,
                    message: "dept create success",
                    data: deptRes,
                });
            } else {
                return res.status(400).send({
                    status: false,
                    message: "dept create failed",
                });
            }
        } else {
            return res.status(401).send({
                status: false,
                message: "dept with that name already exists",
            });
        }
    } catch (error) {
        next(error);
    }
};

const viewDepartment = async (req, res, next) => {
    try {
        let dept_id = req.body.dept_id;
        const dept = await Department.findOne({ dept_id }, { _id: 0, __v: 0 });

        if (dept) {
            return res.status(200).send({
                status: true,
                message: "dept fetch successful",
                data: dept,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "dept fetch failed",
            });
        }
    } catch (error) {
        next(error);
    }
};

const viewAllDepartment = async (req, res, next) => {
    try {
        const depts = await Department.find({}, { _id: 0, __v: 0 });

        if (depts) {
            return res.status(200).send({
                status: true,
                message: "depts fetch successful",
                data: depts,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "depts fetch failed",
            });
        }
    } catch (error) {
        next(error);
    }
};

const editDepartment = async (req, res, next) => {
    try {
        let dept_id = req.body.dept_id;
        let new_dept_params = req.body.dept;

        const result = await Department.findOneAndUpdate(
            { dept_id },
            new_dept_params
        );

        if (result) {
            return res.status(200).send({
                status: true,
                message: "dept update success",
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "dept update fail",
            });
        }
    } catch (error) {
        next(error);
    }
};

const deleteDepartment = async (req, res, next) => {
    try {
        let dept_id = req.body.dept_id;

        const result = await Department.findOneAndDelete({ dept_id });

        if (result) {
            return res.status(200).send({
                status: true,
                message: "dept delete success",
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "dept delete fail",
            });
        }
    } catch (error) {
        next(error);
    }
};

const getDepartmentStats = async (req, res, next) => {
    try {
        let deptStatData = []; // {dept_id, dept_name, idea_post_count}

        let departments = await Department.find({}, { _id: 0, __v: 0 });

        if (departments) {
            let totalPostsCount = 0;
            for (let i = 0; i < departments.length; i++) {
                const { dept_id, dept_name } = departments[i];

                // get posts by dept_id
                const posts = await Post.find({ dept_id }, { _id: 0, __v: 0 });
                let idea_post_count = 0;
                if (posts) {
                    idea_post_count = posts.length;
                }

                totalPostsCount += idea_post_count;

                deptStatData.push({ dept_id, dept_name, idea_post_count });
            }

            deptStatData = deptStatData.map(
                ({ dept_id, dept_name, idea_post_count }) => {
                    return {
                        dept_id,
                        dept_name,
                        idea_post_count,
                        perc: Math.round(
                            (idea_post_count / totalPostsCount) * 100
                        ),
                    };
                }
            );

            return res.status(200).send({
                status: true,
                message: "department stats fetched successfully",
                data: deptStatData,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "department status unavailable",
                data: [],
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createDepartment,
    viewDepartment,
    editDepartment,
    deleteDepartment,
    getDepartmentCount,
    getDepartmentStats,
    viewAllDepartment,
};
