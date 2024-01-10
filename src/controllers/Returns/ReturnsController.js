
const ReturnProductsModel = require("../../models/Returns/ReturnProductsModel");
const ReturnsModel = require("../../models/Returns/ReturnsModel");
const CreateParentChildService = require("../../services/common/CreateParentChildsService");
const DeleteParentChildeService = require("../../services/common/DeleteParentChildService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");

exports.CreateReturns = async (req, res) => {
    const result = await CreateParentChildService(req, ReturnsModel, ReturnProductsModel, 'ReturnId');
    res.status(200).json(result);
}

exports.ReturnsList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let JoinStage = {
        $lookup: {
            from: "customers",
            localField: "CustomerId",
            foreignField: "_id",
            as: "customers"
        }
    };

    let SearchArray = [{ Note: SearchRgx }, { 'customers.CustomerName': SearchRgx }, { 'customers.Address': SearchRgx }, { 'customers.Phone': SearchRgx }, { 'customers.Email': SearchRgx }]
    let result = await ListOneJoinService(req, ReturnsModel, SearchArray, JoinStage);
    res.status(200).json(result)
}


exports.ReturnDelete = async (req, res) => {
    const result = DeleteParentChildeService(req, ReturnsModel, ReturnProductsModel, 'ReturnId')
    res.status(200).json(result);
}