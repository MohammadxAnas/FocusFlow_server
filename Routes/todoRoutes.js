const {Router} = require("express");
const { getTodos, saveTodos, updateTodos, deleteTodos } = require("../controller/todoController");
const ensureAuthenticated = require("../middleware/auth");
const validateSession = require("../middleware/validateSession");

const router = Router();

router.get("/get",validateSession,getTodos);
router.post("/save",ensureAuthenticated, saveTodos);
router.put("/update/:id", ensureAuthenticated, updateTodos);
router.delete("/delete/:id", ensureAuthenticated, deleteTodos);


module.exports = router;