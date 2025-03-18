const {Router} = require("express");
const { signupValidation, loginValidation, codeValidation } = require("../middleware/authvalidation");
const { signup, login, confirmEmail } = require("../controller/authcontroller");

const router = Router();

router.post("/login",loginValidation,login);
router.post("/signup",signupValidation,signup);
router.post("/verify",codeValidation,confirmEmail);

module.exports = router;