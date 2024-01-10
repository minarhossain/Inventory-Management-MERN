
const { default: mongoose } = require("mongoose");
const CategoriesModel = require("../../models/Categories/CategoriesModel");
const ProductsModel = require("../../models/Products/ProductsModel");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const CreateService = require("../../services/common/CreateService");
const DeleteService = require("../../services/common/DeleteService");
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

exports.DeleteCategories = async (req, res) => {
    const DeleteId = req.params.id;
    const ObjectId = mongoose.Types.ObjectId;

    const CheckAssociate = await CheckAssociateService({ CategoryId: ObjectId(DeleteId) }, ProductsModel);
    if (CheckAssociate) {
        res.status(200).json({ status: 'associate', data: 'Associate with Product' });
    } else {
        const result = await DeleteService(req, CategoriesModel);
        res.status(200).json(result);
    }
}