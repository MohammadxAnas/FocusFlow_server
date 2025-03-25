const {Router} = require("express");
const { signupValidation, loginValidation, codeValidation } = require("../middleware/authvalidation");
const { signup, login, confirmEmail, removeAccount, logout } = require("../controller/authcontroller");
const validateSession = require("../middleware/validateSession");

const router = Router();

router.post("/login",loginValidation,login);
router.post("/signup",signupValidation,signup);
router.post("/verify",codeValidation,confirmEmail);
router.delete("/remove/:userId", validateSession,removeAccount);
router.post("/logout/:userId",logout);


module.exports = router;