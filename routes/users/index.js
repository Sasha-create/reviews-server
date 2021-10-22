const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");
const { validationCreateUser } = require("./validation");

router.post("/signup", validationCreateUser, ctrl.signup);

module.exports = router;
