
const CustomersModel = require("../../models/Customers/CustomersModel");
const CreateService = require("../../services/common/CreateService");
const DropDownService = require("../../services/common/DropDownService");
const ListService = require("../../services/common/ListService");
const UpdateService = require("../../services/common/UpdateService");



exports.CreateCustomers = async (req, res) => {
    const result = await CreateService(req, CustomersModel);
    res.status(200).json(result);
}

exports.UpdateCustomers = async (req, res) => {
    const result = await UpdateService(req, CustomersModel);
    res.status(200).json(result);
}

exports.CustomersList = async (req, res) => {
    const searchRgx = { '$regex': req.params.searchKeyword, '$options': 'i' };
    const searchArray = [{ CustomerName: searchRgx }, { Email: searchRgx }, { Address: searchRgx }];
    const result = await ListService(req, CustomersModel, searchArray);
    res.status(200).json(result);
}


exports.CustomersDropDown = async (req, res) => {
    const result = await DropDownService(req, CustomersModel, { _id: 1, Name: 1 });
    res.status(200).json(result);
}