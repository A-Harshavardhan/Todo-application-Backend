const mongoose = require('mongoose');
const Category = require('./Category');

const todoSchema = new mongoose.Schema({
    title : { type : String , required: true},
    description : {type : String, required: true},
    date : { type: Date, required: true},
    category_id : {type : mongoose.Schema.Types.ObjectId , ref: Category, required: true}
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
