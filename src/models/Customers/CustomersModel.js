const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
    UserEmail: { type: String },
    CustomerName: { type: String },
    Email: { type: String },
    Phone: { type: String },
    Address: { type: String },
}, { timestamps: true, versionKey: false });

const CustomersModel = mongoose.model('customers', customerSchema);
module.exports = CustomersModel;