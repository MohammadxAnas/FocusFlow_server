const {Router} = require("express");
const { signupValidation, loginValidation } = require("../middleware/authvalidation");
const { signup, login } = require("../controller/authcontroller");

const router = Router();

router.post("/login",loginValidation,login);
router.post("/signup",signupValidation,signup);

module.exports = router;