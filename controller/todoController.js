const TodoModel = require("../models/todoModels"); // ✅ Correct model import

module.exports.getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find({ userId: req.user._id }); // ✅ Fetch todos for logged-in user
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
};

module.exports.saveTodos = async (req, res) => {
  try {
    const newTodo = new TodoModel({  // ✅ Correct model reference
      userId: req.user._id, 
      todo: req.body.todo,
      completed: false
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: "Error adding todo", error });
  }
};

module.exports.deleteTodos = async (req, res) => {
  try {
    const { id } = req.params; 
    await TodoModel.findByIdAndDelete(id); // ✅ Use await
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
};

module.exports.updateTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const { todo, completed } = req.body;  

    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id, 
      { todo, completed }, 
      { new: true } // ✅ Return updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated successfully", updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
};

module.exports.removeAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
  }
  res.json({ success: true, message: "Account deleted successfully!" });
} catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
}
};