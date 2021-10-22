const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");
const { validationCreateReview } = require("./validation");

router.get("/current", ctrl.current);
router.post("/review", validationCreateReview, ctrl.review);

module.exports = router;
