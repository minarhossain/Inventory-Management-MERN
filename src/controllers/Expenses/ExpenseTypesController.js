const ExpenseModel = require("../../models/Expenses/ExpenseModel");
const ExpenseTypesModel = require("../../models/Expenses/ExpenseTypesModel");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const CreateService = require("../../services/common/CreateService");
const DeleteService = require("../../services/common/DeleteService");
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


exports.DeleteExpenseTypes = async (req, res) => {
    let DeleteId = req.params.id;
    const ObjectId = mongoose.Types.ObjectId;
    let CheckAssociate = await CheckAssociateService({ TypeId: ObjectId(DeleteId) }, ExpenseModel);
    if (CheckAssociate) {
        res.status(200).json({ status: "associate", data: "Associate with Expenses" })
    }
    else {
        let Result = await DeleteService(req, ExpenseTypesModel);
        res.status(200).json(Result)
    }
}