const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    UserEmail: { type: String },
    Name: { type: String, unique: true },

}, { timestamps: true, versionKey: false })

const ExpenseTypesModel = mongoose.model('expenseTypes', expenseSchema);

module.exports = ExpenseTypesModel;