
const CategoriesModel = require("../../models/Categories/CategoriesModel");
const CreateService = require("../../services/common/CreateService");
const DropDownService = require("../../services/common/DropDownService");
const ListService = require("../../services/common/ListService");
const UpdateService = require("../../services/common/UpdateService");



exports.CreateCategories = async (req, res) => {
    const result = await CreateService(req, CategoriesModel);
    res.status(200).json(result);
}

exports.UpdateCategories = async (req, res) => {
    const result = await UpdateService(req, CategoriesModel);
    res.status(200).json(result);
}

exports.CategoriesList = async (req, res) => {
    const searchRgx = { '$regex': req.params.searchKeyword, '$options': 'i' };
    const searchArray = [{ Name: searchRgx }];
    const result = await ListService(req, CategoriesModel, searchArray);
    res.status(200).json(result);
}


exports.CategoriesDropDown = async (req, res) => {
    const result = await DropDownService(req, CategoriesModel, { _id: 1, Name: 1 });
    res.status(200).json(result);
}