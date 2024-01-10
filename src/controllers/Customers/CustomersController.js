
const { default: mongoose } = require("mongoose");
const CustomersModel = require("../../models/Customers/CustomersModel");
const CreateService = require("../../services/common/CreateService");
const DropDownService = require("../../services/common/DropDownService");
const ListService = require("../../services/common/ListService");
const UpdateService = require("../../services/common/UpdateService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const DeleteService = require("../../services/common/DeleteService");
const SalesModel = require("../../models/Sales/SalesModel");
const DetailsByIdService = require("../../services/common/DetailsByIdService");



exports.CreateCustomers = async (req, res) => {
    const result = await CreateService(req, CustomersModel);
    res.status(200).json(result);
}

exports.UpdateCustomers = async (req, res) => {
    const result = await UpdateService(req, CustomersModel);
    res.status(200).json(result);
}

exports.CustomersList = async (req, res) => {
    const searchRgx = { '$regex': req.params.searchKeyword, '$options': 'i' };
    const searchArray = [{ CustomerName: searchRgx }, { Email: searchRgx }, { Address: searchRgx }];
    const result = await ListService(req, CustomersModel, searchArray);
    res.status(200).json(result);
}

exports.CustomerDetailsById = async (req, res) => {
    const result = await DetailsByIdService(req, CustomersModel, { _id: 1, Name: 1 });
    res.status(200).json(result);
}


exports.CustomersDropDown = async (req, res) => {
    const result = await DropDownService(req, CustomersModel, { _id: 1, CustomerName: 1 });
    res.status(200).json(result);
}


exports.DeleteCustomer = async (req, res) => {
    const DeleteId = req.params.id;
    const ObjectId = mongoose.Types.ObjectId;

    const CheckAssociate = await CheckAssociateService({ CustomerId: ObjectId(DeleteId) }, SalesModel);
    if (CheckAssociate) {
        res.status(200).json({ status: 'associate', data: 'Associate with Product' });
    } else {
        const result = await DeleteService(req, CustomersModel);
        res.status(200).json(result);
    }
}