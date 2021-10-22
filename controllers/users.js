const Users = require("../model/users");
const HttpCode = require("../helpers/constants");
require("dotenv").config();

const signup = async (req, res, next) => {
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

module.exports = {
  signup,
};
