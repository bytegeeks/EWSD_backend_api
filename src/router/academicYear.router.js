const router = require("express").Router();

const authentication = require("../utils/middleware/auth.middleware");
const AcademicYearController = require("../controller/academicYear.controller");

router.post(
    "/create-academic-year",
    authentication,
    AcademicYearController.createAcademicYear
);

router.post(
    "/view-academic-year",
    authentication,
    AcademicYearController.viewAcademicYear
);

router.post(
    "/view-all-academic-year",
    authentication,
    AcademicYearController.viewAllAcademicYear
);

router.post(
    "/edit-academic-year",
    authentication,
    AcademicYearController.editAcademicYear
);

module.exports = router;
