const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    UserEmail: { type: String },
    CustomerId: { type: mongoose.Schema.Types.ObjectId },
    VatTax: { type: Number },
    Discount: { type: Number },
    OtherCost: { type: Number },
    ShippingCost: { type: Number },
    GrandTotal: { type: Number },
    Note: { type: String },

}, { timestamps: true, versionKey: false });

const SalesModel = mongoose.model('sales', salesSchema);
module.exports = SalesModel;

// parent model