const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Get routes
router.get('/getCategories', categoryController.getCategories);
router.get('/getCategoryById', categoryController.getCategoryById);

// Post routes
router.post('/addCategory', categoryController.addCategory);

// Put routes
router.put('/updateCategory', categoryController.updateCategory);

// Delete routes
router.delete('/deleteCategory', categoryController.deleteCategory);

module.exports = router;
