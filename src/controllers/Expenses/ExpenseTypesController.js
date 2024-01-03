const ExpenseTypesModel = require("../../models/Expenses/ExpenseTypesModel");
const CreateService = require("../../services/common/CreateService");
const DropDownService = require("../../services/common/DropDownService");
const ListService = require("../../services/common/ListService");
const UpdateService = require("../../services/common/UpdateService");



exports.CreateExpenseTypes = async (req, res) => {
    const result = await CreateService(req, ExpenseTypesModel);
    res.status(200).json(result);
}

exports.UpdateExpenseTypes = async (req, res) => {
    const result = await UpdateService(req, ExpenseTypesModel);
    res.status(200).json(result);
}

exports.ExpenseTypesList = async (req, res) => {
    const searchRgx = { '$regex': req.params.searchKeyword, '$options': 'i' };
    const searchArray = [{ Name: searchRgx }];
    const result = await ListService(req, ExpenseTypesModel, searchArray);
    res.status(200).json(result);
}


exports.ExpenseTypesDropDown = async (req, res) => {
    const result = await DropDownService(req, ExpenseTypesModel, { _id: 1, Name: 1 });
    res.status(200).json(result);
}