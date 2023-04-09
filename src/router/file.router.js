const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const authentication = require("../utils/middleware/auth.middleware");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/home/wathone/Desktop/EWSD_backend_api/public/upload");
    },
    filename: (req, file, cb) => {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });

router.post(
    "/upload",
    authentication,
    upload.single("file"),
    function (req, res) {
        const data = {
            location:
                "http://localhost:5000/upload/" +
                req.file.path.split("/")[req.file.path.split("/").length - 1],
        };
        console.log(data);
        return res.status(200).send({
            status: true,
            message: "file upload success",
            data: data,
        });
    }
);

module.exports = router;
