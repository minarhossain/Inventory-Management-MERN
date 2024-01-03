const ExpenseModel = require("../../models/Expenses/ExpenseModel")
const CreateService = require("../../services/common/CreateService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const UpdateService = require("../../services/common/UpdateService");


exports.CreateExpenses = async (req, res) => {
    const result = await CreateService(req, ExpenseModel);
    res.status(200).json(result);
}


exports.UpdateExpense = async (req, res) => {
    const result = await UpdateService(req, ExpenseModel);
    res.status(200).json(result);
}


exports.ExpensesList = async (req, res) => {
    const searchRgx = { '$regex': req.params.searchKeyword, '$options': 'i' };
    const searchArray = [{ Note: searchRgx }, { Amount: searchRgx }, { 'Type.Name': searchRgx }];
    const JoinStage = { $lookup: { from: 'expensetypes', localField: 'TypeId', foreignField: '_id', as: 'Type' } };
    const result = await ListOneJoinService(req, ExpenseModel, searchArray, JoinStage);
    res.status(200).json(result);
}
