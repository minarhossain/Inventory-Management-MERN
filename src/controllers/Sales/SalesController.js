const SaleProductsModel = require("../../models/Sales/SaleProductsModel")
const SalesModel = require("../../models/Sales/SalesModel")
const CreateParentChildService = require("../../services/common/CreateParentChildsService");
const DeleteParentChildeService = require("../../services/common/DeleteParentChildService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");

exports.CreateSales = async (req, res) => {
    const result = await CreateParentChildService(req, SalesModel, SaleProductsModel, 'SaleId');

    res.status(200).json(result);
}

exports.SalesList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let JoinStage = { $lookup: { from: "customers", localField: "CustomerId", foreignField: "_id", as: "customers" } };

    let SearchArray = [{ Note: SearchRgx }, { 'customers.CustomerName': SearchRgx }, { 'customers.Address': SearchRgx }, { 'customers.Phone': SearchRgx }, { 'customers.Email': SearchRgx }]
    let result = await ListOneJoinService(req, SalesModel, SearchArray, JoinStage);
    res.status(200).json(result)
}


exports.SaleDelete = async (req, res) => {
    const result = await DeleteParentChildeService(req, SalesModel, SaleProductsModel, 'SaleId')
    res.status(200).json(result);
}