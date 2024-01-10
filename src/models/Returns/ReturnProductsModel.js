const mongoose = require('mongoose');


const returnProductsSchema = new mongoose.Schema({
    UserEmail: { type: String },
    ReturnId: { type: mongoose.Schema.Types.ObjectId },
    ProductId: { type: mongoose.Schema.Types.ObjectId },
    Qty: { type: Number },
    UnitCost: { type: Number },
    Total: { type: Number }

}, { timestamps: true, versionKey: false });


const ReturnProductsModel = mongoose.model('ReturnProducts', returnProductsSchema);
module.exports = ReturnProductsModel;

// child model