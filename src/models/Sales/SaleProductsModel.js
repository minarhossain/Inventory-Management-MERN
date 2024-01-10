const mongoose = require('mongoose');

const saleProductsSchema = new mongoose.Schema({
    UserEmail: { type: String },
    SaleId: { type: mongoose.Schema.Types.ObjectId },
    ProductId: { type: mongoose.Schema.Types.ObjectId },
    Qty: { type: Number },
    UnitCost: { type: Number },
    Total: { type: Number },


}, { timestamps: true, versionKey: false })

const SaleProductsModel = mongoose.model('saleProducts', saleProductsSchema);
module.exports = SaleProductsModel;

// child model