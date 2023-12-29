const mongoose = require('mongoose');
const supplierSchema = new mongoose.Schema({
    UserEmail: { type: String },
    Name: { type: String },
    Address: { type: String },
    Phone: { type: String, unique: true },
    Email: { type: String },

}, { timestamps: true, versionKey: false })

const SuppliersModel = mongoose.model('suppliers', supplierSchema);
module.exports = SuppliersModel;