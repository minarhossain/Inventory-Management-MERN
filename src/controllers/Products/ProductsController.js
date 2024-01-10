const { default: mongoose } = require("mongoose");
const ProductsModel = require("../../models/Products/ProductsModel")
const CreateService = require("../../services/common/CreateService");
const ListTwoJoinService = require("../../services/common/ListTwoJoinService");
const UpdateService = require("../../services/common/UpdateService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const ReturnProductsModel = require("../../models/Returns/ReturnProductsModel");
const PurchaseProductsModel = require("../../models/Purchases/PurchasesModel");
const SaleProductsModel = require("../../models/Sales/SaleProductsModel");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIdService = require("../../services/common/DetailsByIdService");




exports.CreateProducts = async (req, res) => {
    const result = await CreateService(req, ProductsModel);
    res.status(200).json(result);
}


exports.UpdateProduct = async (req, res) => {
    const result = await UpdateService(req, ProductsModel);
    res.status(200).json(result);
}

exports.ProductsList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }

    let JoinStage1 = { $lookup: { from: "brands", localField: "BrandID", foreignField: "_id", as: "brands" } }
    let JoinStage2 = { $lookup: { from: "categories", localField: "CategoryID", foreignField: "_id", as: "categories" } }

    let SearchArray = [{ Name: SearchRgx }, { Details: SearchRgx }, { 'brands.Name': SearchRgx }, { 'categories.Name': SearchRgx }]

    let result = await ListTwoJoinService(req, ProductsModel, SearchArray, JoinStage1, JoinStage2)
    res.status(200).json(result)
};


exports.ProductsDetailsById = async (req, res) => {
    const result = await DetailsByIdService(req, ProductsModel, { _id: 1, Name: 1 });
    res.status(200).json(result);
}

exports.DeleteProduct = async (req, res) => {
    const DeleteId = req.params.id;
    const ObjectId = mongoose.Types.ObjectId;

    const CheckReturnAssociate = await CheckAssociateService({ ProductId: ObjectId(DeleteId) }, ReturnProductsModel);

    const CheckPurchaseAssociate = await CheckAssociateService({ ProductId: ObjectId(DeleteId) }, PurchaseProductsModel);

    const CheckSaleAssociate = await CheckAssociateService({ ProductId: ObjectId(DeleteId) }, SaleProductsModel);

    if (CheckReturnAssociate) {
        res.status(200).json({ status: 'associate', data: 'Associate with Return' });
    } else if (CheckPurchaseAssociate) {
        res.status(200).json({ status: 'associate', data: 'Associate with Purchase' });
    } else if (CheckSaleAssociate) {
        res.status(200).json({ status: 'associate', data: 'Associate with Sale' });
    } else {
        const result = await DeleteService(req, ProductsModel);
        res.status(200).json(result);
    }
}