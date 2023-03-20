const Category = require("../model/category.model");
const crypto = require("crypto");

const createCategory = async (req, res, next) => {
    try {
        let category = req.body.category;
        let category_name = category.category_name;
        const category_name_exists = await Category.findOne(
            {
                category_name: category_name,
            },
            { _id: 0, __v: 0 }
        );

        if (!category_name_exists) {
            category["category_id"] = crypto.randomUUID();
            const categoryRes = await new Category(category).save();

            if (categoryRes) {
                return res.status(201).send({
                    status: true,
                    message: "category create success",
                    data: categoryRes,
                });
            } else {
                return res.status(400).send({
                    status: false,
                    message: "category create failed",
                });
            }
        } else {
            return res.status(401).send({
                status: false,
                message: "category with that name already exists",
            });
        }
    } catch (error) {
        next(error);
    }
};

const viewCategory = async (req, res, next) => {
    try {
        let category_id = req.body.category_id;
        const category = await Category.findOne(
            { category_id },
            { _id: 0, __v: 0 }
        );

        if (category) {
            return res.status(200).send({
                status: true,
                message: "category fetch successful",
                data: category,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "category fetch failed",
            });
        }
    } catch (error) {
        next(error);
    }
};

const editCategory = async (req, res, next) => {
    try {
        let category_id = req.body.category_id;
        let new_category_params = req.body.category;

        const result = await Category.findOneAndUpdate(
            { category_id },
            new_category_params
        );

        if (result) {
            return res.status(200).send({
                status: true,
                message: "category update success",
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "category update fail",
            });
        }
    } catch (error) {
        next(error);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        let category_id = req.body.category_id;

        const result = await Category.findOneAndDelete({ category_id });

        if (result) {
            return res.status(200).send({
                status: true,
                message: "category delete success",
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "category delete fail",
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCategory,
    viewCategory,
    editCategory,
    deleteCategory,
};
