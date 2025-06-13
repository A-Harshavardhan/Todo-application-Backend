const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name : { type : String },
    slug : { type : String, unique: true}
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
