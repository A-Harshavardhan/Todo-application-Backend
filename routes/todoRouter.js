const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Get routes
router.get('/', todoController.fetchTodos);
router.get('/getTodo/:todo_id', todoController.getTodo);
router.get('/filterTodo/:cid', todoController.filterTodo);
router.get('/sortTodo/', todoController.sortTodo);

// Post routes
router.post('/addTodo', todoController.addTodo);

// Put routes
router.put('/updateTodo/:todo_id', todoController.updateTodo);

// Delete routes
router.delete('/deleteTodo/', todoController.deleteTodo);
router.delete('/deleteTodosByCategoryId/', todoController.deleteTodosByCategoryId);

module.exports = router;
