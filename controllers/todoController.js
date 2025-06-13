const Category = require('../models/Category');
const Todo = require('../models/Todo');

// To fetch all todos and categories
exports.fetchTodos = async (req, res) => {
    const todos = await Todo.find().populate({ path : 'category_id' });
    const categories = await Category.find();
    res.json({
        todos: todos,
        categories : categories
    });
};

// To add todo in the database
exports.addTodo = async (req, res) => {
    try {
        const { title, description, date, category } = req.body;
        const categoryField = await Category.findOne({slug : category});
        const category_id = categoryField._id;

        const todo = new Todo({ title, description, date, category_id });
        await todo.save();
        res.status(200).json({
            success : true,
            message : 'Todo created successfully'
        });
    }
    catch(e) {
        res.status(200).json({
            success : false,
            message : 'Error inserting Todo : ' + e.message
        });
    }
}

// To filter todo based on the category selected.
exports.filterTodo = async (req, res) => {
    try {
        const cid = req.params.cid;
        const filteredTodos = await Todo.find({ category_id : cid }).populate({ path : 'category_id' });
        res.json({
            filteredTodos : filteredTodos
        });
    }
    catch(e) {
        res.json({
            message : 'Error occured while filtering data : ' + e.message
        });
    }
}

// To sort the todos based on date
exports.sortTodo = async (req, res) => {
    try {
        const { sortOption, cid } = req.query;
        let sortedTodos;
        if(cid) {
            sortedTodos = await Todo.find({ category_id : cid }).sort({date : sortOption === 'ASC' ? 1 : -1 }).populate({path : 'category_id'});
        }
        else {
            sortedTodos = await Todo.find().sort({date : sortOption === 'ASC' ? 1 : -1 }).populate({path : 'category_id'});
        }
        res.json({
            msg : 'Sorted Successfully!',
            sortedTodos : sortedTodos
        });
    }
    catch(e) {
        res.status(500).json({
            msg : e.message
        });
    }
}

// To delete the selected todo
exports.deleteTodo = async (req, res) => {
    try {
        const { todo_id } = req.query;
        const deleteTodo = await Todo.findByIdAndDelete(todo_id);

        if(!deleteTodo) {
            return res.json({
                message : 'Todo not found'
            });
        }

        res.status(200).json({
            message : 'Todo Deleted successfully'
        });
    }
    catch(e) {
        res.status(500).json({
            message : 'Error occured while deleting todo : '+e.message
        });
    }
}

// To get the particular todo
exports.getTodo = async (req, res) => {
    const todo_id  = req.params.todo_id;
    try {
        const todo = await Todo.findById({ _id : todo_id }).populate({path : 'category_id'});
        if(!todo) {
            res.status(404).json({
                message : 'Todo not found with id' + todo_id
            });
        }
        res.status(200).json(todo);
    }
    catch(e) {
        res.status(500).json({
            message : e.message
        });
    }
}

// endpoint to update the todo
exports.updateTodo = async (req, res) => {
    const todo_id = req.params.todo_id;
    const { title, description, date, category } = req.body;

    try {
        const category_id = await Category.findOne({slug : category});
        const todo = await Todo.findByIdAndUpdate(todo_id, {title, description, date, category_id});
        if(!todo) {
            res.status(404).json({
                message : 'Todo not found with id' + todo_id
            });
        }
        res.status(200).json({
            message : 'Todo updated successfully!'
        });
    }
    catch(e) {
        res.status(500).json({
            message : e.message
        });
    }
}

// Endpoint to delete all todos by category id.
exports.deleteTodosByCategoryId = async (req, res) => {
    try {
        const {cid} = req.query;
        const deleteTodos = await Todo.deleteMany({ category_id : cid});
        res.status(200).json({
            message : 'Deleted all todos by category'
        });
    }
    catch(e) {
        res.status(500).json({
            message : e.message
        });
    }
}