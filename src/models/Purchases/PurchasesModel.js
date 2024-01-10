const mongoose = require('mongoose');
const purchaseSchema = new mongoose.Schema({
    UserEmail: { type: String },
    SupplierId: { type: mongoose.Schema.Types.ObjectId },
    VatTax: { type: Number },
    Discount: { type: Number },
    OtherCost: { type: Number },
    ShippingCost: { type: Number },
    GrandTotal: { type: Number },
    Note: { type: String }

}, { timestamps: true, versionKey: false });
const PurchasesModel = mongoose.model('purchases', purchaseSchema);
module.exports = PurchasesModel;


//Parent Model of Purchase