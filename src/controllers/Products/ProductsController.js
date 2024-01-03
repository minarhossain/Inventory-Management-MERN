const ProductsModel = require("../../models/Products/ProductsModel")
const CreateService = require("../../services/common/CreateService");
const ListTwoJoinService = require("../../services/common/ListTwoJoinService");
const UpdateService = require("../../services/common/UpdateService");




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