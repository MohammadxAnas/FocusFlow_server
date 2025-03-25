const {Router} = require("express");
const { getTodos, saveTodos, updateTodos, deleteTodos } = require("../controller/todoController");
const validateSession = require("../middleware/validateSession");

const router = Router();

router.get("/get",validateSession,getTodos);
router.post("/save",validateSession, saveTodos);
router.put("/update/:id", validateSession, updateTodos);
router.delete("/delete/:id", validateSession, deleteTodos);


module.exports = router;