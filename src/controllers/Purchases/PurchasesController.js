const PurchasesModel = require("../../models/Purchases/PurchaseProductsModel") // parent model
const PurchaseProductsModel = require("../../models/Purchases/PurchasesModel") // child model
const CreateParentChildService = require("../../services/common/CreateParentChildsService");
const DeleteParentChildeService = require("../../services/common/DeleteParentChildService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");


// i have to change the model 

exports.CreatePurchases = async (req, res) => {

    const result = await CreateParentChildService(req, PurchasesModel, PurchaseProductsModel, 'PurchaseId');
    res.status(200).json(result);
}


exports.PurchasesList = async (req, res) => {
    let SearchRgx = { "$regex": req.params.searchKeyword, "$options": "i" }
    let JoinStage = { $lookup: { from: "suppliers", localField: "SupplierID", foreignField: "_id", as: "suppliers" } };
    let SearchArray = [{ Note: SearchRgx }, { 'suppliers.Name': SearchRgx }, { 'suppliers.Address': SearchRgx }, { 'suppliers.Phone': SearchRgx }, { 'suppliers.Email': SearchRgx }]
    let Result = await ListOneJoinService(req, PurchasesModel, SearchArray, JoinStage);
    res.status(200).json(Result)
}

exports.PurchaseDelete = async (req, res) => {
    const result = DeleteParentChildeService(req, PurchasesModel, PurchasesModel, 'PurchaseId')
    console.log(result);
    res.status(200).json(result);
}