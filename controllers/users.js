const Users = require("../model/users");
const HttpCode = require("../helpers/constants");
require("dotenv").config();

const review = async (req, res, next) => {
  const { email } = req.body;
  const user = await Users.findByEmail(email);
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: "error",
      contentType: "application/json",
      code: HttpCode.CONFLICT,
      responseBody: {
        message: "Email in use",
      },
    });
  }
  try {
    const newUser = await Users.create(req.body);
    return res.json({
      status: "created",
      contentType: "application/json",
      code: HttpCode.CREATED,
      responseBody: {
        user: {
          name: newUser.name,
          email: newUser.email,
          message: newUser.message,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await Users.getCurrentUser(userId);
    console.log(user);
    if (user) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        user: {
          name: user.name,
          email: user.email,
          message: user.message,
        },
      });
    } else {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        message: "Not authorized",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  review,
  current,
};
