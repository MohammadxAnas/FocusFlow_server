const todoModel = require("../models/todoModels");
module.exports.getTodos = async(req, res)=> {
    const todos = await todoModel.find()
    res.send(todos)
};

module.exports.saveTodos = async(req, res)=> {
    const {todo} = req.body; 

    todoModel.create({todo})
    .then((data)=> {
        console.log("saved successfully...");
        res.status(201).send(data);
    })
    .catch(err => console.log(err));
};

module.exports.deleteTodos = async(req, res)=> {
    const {id} = req.params; 

    todoModel.findByIdAndDelete(id)
    .then((data)=> {
        res.send("deleted successfully...");
    })
    .catch(err => console.log(err));
};

module.exports.updateTodos = async(req, res)=> {
    const {id} = req.params;
    const {todo} = req.body; 
    const {completed} =req.body; 

    todoModel.findByIdAndUpdate(id, {todo,completed})
    .then((data)=> {
        res.send("updated successfully...");
    })
    .catch(err => console.log(err));
};
