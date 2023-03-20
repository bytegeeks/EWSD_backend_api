const UserModel = require("../model/user.model");
const crypto = require("crypto");

const { getHash } = require("../utils/password.util");
const { generateJWT } = require("../utils/jwt.util");

const registerUser = async (req, res, next) => {
    try {
        let user = req.body.user;
        const USER_EMAIL = user.user_email;
        const user_exists = await UserModel.findOne(
            { user_email: USER_EMAIL },
            { _id: 0, __v: 0 }
        );
        if (!user_exists) {
            user["user_id"] = crypto.randomUUID();
            user.user_password = getHash(user.user_password);
            const userRes = await new UserModel(user).save();
            if (userRes) {
                return res.status(201).send({
                    status: true,
                    message: "user register success",
                });
            } else {
                return res.status(400).send({
                    status: false,
                    message: "user register failed",
                });
            }
        } else {
            return res.status(401).send({
                status: false,
                message: "user already registered with the email",
            });
        }
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        let user = await UserModel.findOne(
            { user_email: email },
            { _id: 0, __v: 0 }
        );
        if (user) {
            const USER_PASSWORD_HASH = user.user_password;
            const REQUEST_PASSWORD_HASH = getHash(password);

            delete user["user_password"];

            if (USER_PASSWORD_HASH === REQUEST_PASSWORD_HASH) {
                const accessToken = generateJWT(user);
                // console.log(accessToken);

                return res.status(200).send({
                    status: true,
                    message: "user login success",
                    accessToken: accessToken,
                });
            } else {
                return res.status(403).send({
                    status: false,
                    message: "user login failed, incorrect password",
                });
            }
        } else {
            return res.status(401).send({
                status: false,
                message: "user email does not exist",
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { loginUser, registerUser };
