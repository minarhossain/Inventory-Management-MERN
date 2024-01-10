const { default: mongoose } = require("mongoose");
const BrandsModel = require("../../models/Brands/BrandsModel")
const CreateService = require("../../services/common/CreateService");
const DropDownService = require("../../services/common/DropDownService");
const ListService = require("../../services/common/ListService");
const UpdateService = require("../../services/common/UpdateService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const ProductsModel = require("../../models/Products/ProductsModel");
const DetailsByIdService = require("../../services/common/DetailsByIdService");



exports.CreateBrand = async (req, res) => {
    const result = await CreateService(req, BrandsModel);
    res.status(200).json(result);
}

exports.UpdateBrand = async (req, res) => {
    const result = await UpdateService(req, BrandsModel);
    res.status(200).json(result);
}

exports.BrandList = async (req, res) => {
    const searchRgx = { '$regex': req.params.searchKeyword, '$options': 'i' };
    const searchArray = [{ Name: searchRgx }];
    const result = await ListService(req, BrandsModel, searchArray);
    res.status(200).json(result);
}

exports.BrandDetailsById = async (req, res) => {
    const result = await DetailsByIdService(req, BrandsModel, { _id: 1, Name: 1 });
    res.status(200).json(result);
}

exports.BrandDropDown = async (req, res) => {
    const result = await DropDownService(req, BrandsModel, { _id: 1, Name: 1 });
    res.status(200).json(result);
}



exports.DeleteBrand = async (req, res) => {
    const DeleteId = req.params.id;
    const ObjectId = mongoose.Types.ObjectId;

    const CheckAssociate = await CheckAssociateService({ BrandId: ObjectId(DeleteId) }, ProductsModel);
    if (CheckAssociate) {
        res.status(200).json({ status: 'associate', data: 'Associate with Product' });
    } else {
        const result = await DeleteService(req, BrandsModel);
        res.status(200).json(result);
    }
}