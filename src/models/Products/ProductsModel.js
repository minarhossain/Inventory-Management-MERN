const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    UserEmail: { type: String },
    CategoryId: { type: mongoose.Schema.Types.ObjectId },
    BrandId: { type: mongoose.Schema.Types.ObjectId },
    Name: { type: String },
    Unit: { type: String },
    Details: { type: String }

}, { timestamps: true, versionKey: false });

const ProductsModel = mongoose.model('Products', productSchema);
module.exports = ProductsModel;


// product model