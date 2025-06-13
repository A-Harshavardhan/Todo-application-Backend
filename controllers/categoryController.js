const Category = require('../models/Category');

// Endpoint to get all categories
exports.getCategories = async (req, res) => {
    const categories = await Category.find();
    res.json({
        categories: categories
    });
}

exports.getCategoryById = async (req, res) => {
    try {
        const {cid} = req.query;
        const category = await Category.findById(cid);
        res.status(200).json({
            category : category
        });
    }
    catch(e) {
        res.json({
            message : e.message
        });
    }
}

// Endpoint to create category
exports.addCategory = async (req, res) => {
    try {
        const { name, slug } = req.body;
        const createCategory = await Category.create({ name: name, slug: slug });

        if(!createCategory) {
            res.json({
                message : 'Something went wrong!'
            });
        }

        res.status(200).json({
            message : 'Category created successfully!'
        });
    }
    catch(e) {
        res.status(500).json({
            message : 'Error while creating category' + e.message
        });
    }
}

// Endpoint to update the category by it's id.
exports.updateCategory = async (req, res) => {
    try {
        const {name, slug, cid} = req.body;
        const updateCategory = await Category.findByIdAndUpdate(cid, {name, slug});
        if(!updateCategory) {
            res.status(500).json({
                message : 'Something went wrong'
            });
            return;
        }
        res.status(200).json({
            message : 'Category Updated Successfully!'
        });
    }
    catch(e) {
        res.status(500).json({
            message : e.message
        });
    }
}

// Endpoint to delete the category by it's id.
exports.deleteCategory = async (req, res) => {
    try {
        const {cid} = req.query;
        const category = await Category.findByIdAndDelete(cid);
        if(!category) {
            res.status(500).json({
                message : `Category Id : ${category_id} not found !`
            });
            return;
        }
        res.status(200).json({
            message : 'Category deleted Successfully!'
        });
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
}
