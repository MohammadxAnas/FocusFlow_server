const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,
         ref: "user", required: true },
    todo: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,  // New tasks will be incomplete by default
    },
});

const TodoModel = mongoose.model("Todo", todoSchema);

module.exports = TodoModel;
