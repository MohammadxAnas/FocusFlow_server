const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,  // New tasks will be incomplete by default
    },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
