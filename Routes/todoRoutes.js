const {Router} = require("express");
const { getTodos, saveTodos, updateTodos, deleteTodos } = require("../controller/todoController");
const router = Router();

router.get("/get",getTodos);
router.post("/save", saveTodos);
router.put("/update/:id",updateTodos);
router.delete("/delete/:id",deleteTodos);

module.exports = router;