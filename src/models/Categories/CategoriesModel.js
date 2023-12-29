const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    UserEmail: { type: String },
    Name: { type: String, unique: true },
}, { timestamps: true, versionKey: false });

const CategoriesModel = mongoose.model('categories', categorySchema);
module.exports = CategoriesModel;