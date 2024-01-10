const mongoose = require('mongoose');

const returnsSchema = new mongoose.Schema({
    UserEmail: { type: String },
    CustomerId: { type: mongoose.Schema.Types.ObjectId },
    VatTax: { type: Number },
    Discount: { type: Number },
    OtherCost: { type: Number },
    ShippingCost: { type: Number },
    GrandTotal: { type: Number },
    Note: { type: String }

}, { timestamps: true, versionKey: false });


const ReturnsModel = mongoose.model('returns', returnsSchema);
module.exports = ReturnsModel;


// parent