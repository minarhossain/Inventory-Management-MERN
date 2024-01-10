const ExpenseSummaryService = require("../../services/summary/ExpenseSummaryService");
const PurchaseSummaryService = require("../../services/summary/PurchaseSummaryService");
const ReturnSummaryService = require("../../services/summary/ReturnSummaryService");
const SalesSummaryService = require("../../services/summary/SalesSummaryService");



exports.ExpensesSummary = async (req, res) => {
    const result = await ExpenseSummaryService(req);
    res.status(200).json(result);
};

exports.ReturnSummary = async (req, res) => {
    const result = await ReturnSummaryService(req);
    res.status(200).json(result);
};

exports.PurchaseSummary = async (req, res) => {
    const result = await PurchaseSummaryService(req);
    res.status(200).json(result);
}

exports.SalesSummary = async (req, res) => {
    const result = await SalesSummaryService(req);
    res.status(200).json(result);
}