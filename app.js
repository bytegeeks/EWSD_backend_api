const express = require("express");
const cors = require("cors");
require("./src/utils/database.util");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: "*",
};

const app = express();

const userRouter = require("./src/router/user.router");
const categoryRouter = require("./src/router/category.router");
const departmentRouter = require("./src/router/department.router");
const academicYearRouter = require("./src/router/academicYear.router");
const postRouter = require("./src/router/post.router");
const commentRouter = require("./src/router/comment.router");

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    return res.send({ message: "server's up" });
});

app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/department", departmentRouter);
app.use("/academic-year", academicYearRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

app.listen(PORT, () => {
    console.log(`server is listening on http://localhost:${PORT}`);
});
