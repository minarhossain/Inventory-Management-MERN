
const { default: mongoose } = require("mongoose");
const SuppliersModel = require("../../models/Suppliers/SuppliersModel");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const CreateService = require("../../services/common/CreateService");
const DropDownService = require("../../services/common/DropDownService");
const ListService = require("../../services/common/ListService");
const UpdateService = require("../../services/common/UpdateService");
const PurchasesModel = require("../../models/Purchases/PurchaseProductsModel");
const DeleteService = require("../../services/common/DeleteService");



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

// delete supplier
exports.DeleteSupplier = async (req, res) => {
    const DeleteId = req.params.id;
    const ObjectId = mongoose.Types.ObjectId;

    const CheckAssociate = await CheckAssociateService({ ProductId: ObjectId(DeleteId) }, PurchasesModel);

    if (CheckAssociate) {
        res.status(200).json({ status: 'associate', data: 'Associate with Return' });
    } else {
        const result = await DeleteService(req, SuppliersModel);
        res.status(200).json(result);
    }
}