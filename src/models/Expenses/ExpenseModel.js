const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    UserEmail: { type: String },
    TypeId: { type: mongoose.Schema.Types.ObjectId },
    Amount: { type: String },
    Note: { type: String }

}, { timestamps: true, versionKey: false });


const ExpenseModel = mongoose.model('Expenses', expenseSchema);

module.exports = ExpenseModel;