const mongoose = require('mongoose');

const purchaseProductsSchema = new mongoose.Schema({
    UserEmail: { type: String },
    PurchaseId: { type: mongoose.Schema.Types.ObjectId },
    ProductId: { type: mongoose.Schema.Types.ObjectId },
    Qty: { type: Number },
    UnitCost: { type: Number },
    Total: { type: Number },

}, { timestamps: true, versionKey: false });
const PurchaseProductsModel = mongoose.model('purchaseProducts', purchaseProductsSchema);
module.exports = PurchaseProductsModel;

// child model 