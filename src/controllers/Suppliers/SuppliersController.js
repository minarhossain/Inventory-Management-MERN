
const SuppliersModel = require("../../models/Suppliers/SuppliersModel");
const CreateService = require("../../services/common/CreateService");
const DropDownService = require("../../services/common/DropDownService");
const ListService = require("../../services/common/ListService");
const UpdateService = require("../../services/common/UpdateService");



exports.CreateSuppliers = async (req, res) => {
    const result = await CreateService(req, SuppliersModel);
    res.status(200).json(result);
}

exports.UpdateSuppliers = async (req, res) => {
    const result = await UpdateService(req, SuppliersModel);
    res.status(200).json(result);
}

exports.SuppliersList = async (req, res) => {
    const searchRgx = { '$regex': req.params.searchKeyword, '$options': 'i' };
    const searchArray = [{ Name: searchRgx }];
    const result = await ListService(req, SuppliersModel, searchArray);
    res.status(200).json(result);
}


exports.SuppliersDropDown = async (req, res) => {
    const result = await DropDownService(req, SuppliersModel, { _id: 1, Name: 1 });
    res.status(200).json(result);
}