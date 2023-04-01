const AcademicYear = require("../model/academicYear.model");
const crypto = require("crypto");

const getLatestActiveAcademicYear = async (req, res, next) => {
    try {
        const latestActiveAcademicYear = await AcademicYear.findOne(
            {
                active: true,
            },
            { __v: 0, _id: 0 }
        );

        if (latestActiveAcademicYear) {
            return res.status(200).send({
                status: true,
                message: "latest academic year fetched successfully",
                data: latestActiveAcademicYear,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "latest academic year fetch failed",
            });
        }
    } catch (error) {
        next(error);
    }
};

const createAcademicYear = async (req, res, next) => {
    try {
        let academicYear = req.body.academicYear;
        let academic_year_name = academicYear.academic_year_name;
        const academic_year_name_exists = await AcademicYear.findOne(
            {
                academic_year_name: academic_year_name,
            },
            { _id: 0, __v: 0 }
        );

        if (!academic_year_name_exists) {
            academicYear["academic_year_id"] = crypto.randomUUID();
            const academic_year_res = await new AcademicYear(
                academicYear
            ).save();

            if (academic_year_res) {
                return res.status(201).send({
                    status: true,
                    message: "academic_year create success",
                    data: academic_year_res,
                });
            } else {
                return res.status(400).send({
                    status: false,
                    message: "academic_year create failed",
                });
            }
        } else {
            return res.status(401).send({
                status: false,
                message: "academic_year with that name already exists",
            });
        }
    } catch (error) {
        next(error);
    }
};

const viewAcademicYear = async (req, res, next) => {
    try {
        let academic_year_id = req.body.academic_year_id;
        const academic_year = await AcademicYear.findOne(
            { academic_year_id },
            { _id: 0, __v: 0 }
        );

        if (academic_year) {
            return res.status(200).send({
                status: true,
                message: "academic_year fetch successful",
                data: academic_year,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "academic_year fetch failed",
            });
        }
    } catch (error) {
        next(error);
    }
};

const viewAllAcademicYear = async (req, res, next) => {
    try {
        const academic_years = await AcademicYear.find({}, { _id: 0, __v: 0 });

        if (academic_years) {
            return res.status(200).send({
                status: true,
                message: "academic_years fetch successful",
                data: academic_years,
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "academic_years fetch failed",
            });
        }
    } catch (error) {
        next(error);
    }
};

const deleteAcademicYear = async (req, res, next) => {
    try {
        let academic_year_id = req.body.academic_year_id;
        const result = await AcademicYear.deleteOne({ academic_year_id });

        if (result) {
            return res.status(200).send({
                status: true,
                message: "academic year delete success",
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "academic year delete failed",
            });
        }
    } catch (error) {}
};

const editAcademicYear = async (req, res, next) => {
    try {
        let academic_year_id = req.body.academic_year_id;
        let new_academic_year_params = req.body.academicYear;

        const result = await AcademicYear.findOneAndUpdate(
            { academic_year_id },
            new_academic_year_params
        );

        if (result) {
            return res.status(200).send({
                status: true,
                message: "academic_year update success",
            });
        } else {
            return res.status(400).send({
                status: false,
                message: "academic_year update fail",
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createAcademicYear,
    viewAcademicYear,
    editAcademicYear,
    viewAllAcademicYear,
    getLatestActiveAcademicYear,
    deleteAcademicYear,
};
