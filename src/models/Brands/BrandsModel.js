const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    UserEmail: { type: String },
    Name: { type: String, unique: true },
}, { timestamps: true, versionKey: false });

const BrandsModel = mongoose.model('brands', brandSchema);

module.exports = BrandsModel;