const express = require('express');
const { Registration, Login, ProfileUpdate, ProfileDetails, RecoverVerifyEmail, RecoverVerifyOTP, RecoverResetPass } = require('../controllers/Users/UsersController');
const AuthVerify = require('../middlewares/AuthVerifyMiddleware');
const { CreateBrand, UpdateBrand, BrandList, BrandDropDown, DeleteBrand } = require('../controllers/Brands/BrandsController');
const { CreateCategories, UpdateCategories, CategoriesList, CategoriesDropDown, DeleteCategories } = require('../controllers/Categories/CategoriesController');
const { CreateCustomers, UpdateCustomers, CustomersList, CustomersDropDown, DeleteCustomer } = require('../controllers/Customers/CustomersController');
const { CreateSuppliers, UpdateSuppliers, SuppliersList, SuppliersDropDown, DeleteSupplier } = require('../controllers/Suppliers/SuppliersController');
const { CreateExpenseTypes, UpdateExpenseTypes, ExpenseTypesList, ExpenseTypesDropDown, DeleteExpenseTypes } = require('../controllers/Expenses/ExpenseTypesController');
const { CreateExpenses, UpdateExpense, ExpensesList, DeleteExpense } = require('../controllers/Expenses/ExpenseController');
const { CreateProducts, UpdateProduct, ProductsList, DeleteProduct } = require('../controllers/Products/ProductsController');
const { CreatePurchases, PurchasesList, PurchaseDelete } = require('../controllers/Purchases/PurchasesController');
const { CreateSales, SalesList, SaleDelete } = require('../controllers/Sales/SalesController');
const { CreateReturns, ReturnsList, ReturnDelete } = require('../controllers/Returns/ReturnsController');
const { ExpensesByDate, ReturnByDate, PurchaseByDate, SalesByDate } = require('../controllers/Report/ReportController');
const { ExpensesSummary, ReturnSummary, PurchaseSummary, SalesSummary } = require('../controllers/Summary/SummaryController');

const router = express.Router();


// user profile
router.post('/Registration', Registration)
router.post('/Login', Login);
router.post('/ProfileUpdate', AuthVerify, ProfileUpdate);
router.get('/ProfileDetails', AuthVerify, ProfileDetails);
router.get('/RecoverVerifyEmail/:email', RecoverVerifyEmail);
router.get('/RecoverVerifyOTP/:email/:otp', RecoverVerifyOTP);
router.post('/RecoverResetPass', RecoverResetPass);


// brands
router.post('/CreateBrand', AuthVerify, CreateBrand);
router.post('/UpdateBrand/:id', AuthVerify, UpdateBrand);
router.get('/BrandList/:pageNo/:perPage/:searchKeyword', AuthVerify, BrandList);
router.get('/BrandDropdown', AuthVerify, BrandDropDown);
router.get('/DeleteBrand/:id', AuthVerify, DeleteBrand)


// categories
router.post('/CreateCategories', AuthVerify, CreateCategories);
router.post('/UpdateCategories/:id', AuthVerify, UpdateCategories);
router.get('/CategoriesList/:pageNo/:perPage/:searchKeyword', AuthVerify, CategoriesList);
router.get('/CategoriesDropDown', AuthVerify, CategoriesDropDown);
router.get('/DeleteCategories/:id', AuthVerify, DeleteCategories);


// customers
router.post('/CreateCustomers', AuthVerify, CreateCustomers);
router.post('/UpdateCustomers/:id', AuthVerify, UpdateCustomers);
router.get('/CustomersList/:pageNo/:perPage/:searchKeyword', AuthVerify, CustomersList);
router.get('/CustomersDropDown', AuthVerify, CustomersDropDown);
router.get('/DeleteCustomer/:id', AuthVerify, DeleteCustomer);


// suppliers
router.post('/CreateSuppliers', AuthVerify, CreateSuppliers);
router.post('/UpdateSuppliers/:id', AuthVerify, UpdateSuppliers);
router.get('/SuppliersList/:pageNo/:perPage/:searchKeyword', AuthVerify, SuppliersList);
router.get('/SuppliersDropDown', AuthVerify, SuppliersDropDown);
router.get('/DeleteSupplier/:id', AuthVerify, DeleteSupplier);


// ExpenseTypes
router.post('/CreateExpenseTypes', AuthVerify, CreateExpenseTypes);
router.post('/UpdateExpenseTypes/:id', AuthVerify, UpdateExpenseTypes);
router.get('/ExpenseTypesList/:pageNo/:perPage/:searchKeyword', AuthVerify, ExpenseTypesList);
router.get('/ExpenseTypesDropDown', AuthVerify, ExpenseTypesDropDown);
router.get('/DeleteExpenseTypes/:id', AuthVerify, DeleteExpenseTypes);


// Expense
router.post('/CreateExpense', AuthVerify, CreateExpenses);
router.post('/UpdateExpense/:id', AuthVerify, UpdateExpense);
router.get('/ExpensesList/:pageNo/:perPage/:searchKeyword', AuthVerify, ExpensesList);
router.get('/DeleteExpense/:id', AuthVerify, DeleteExpense);


// Products
router.post('/CreateProducts', AuthVerify, CreateProducts);
router.post('/UpdateProduct/:id', AuthVerify, UpdateProduct);
router.get("/ProductsList/:pageNo/:perPage/:searchKeyword", AuthVerify, ProductsList);
router.get('/DeleteProduct', AuthVerify, DeleteProduct);


// Purchase
router.post('/CreatePurchases', AuthVerify, CreatePurchases);
router.get('/PurchasesList/:pageNo/:perPage/:searchKeyword', AuthVerify, PurchasesList);
router.get('/PurchaseDelete/:id', AuthVerify, PurchaseDelete);


// Sales
router.post('/CreateSales', AuthVerify, CreateSales);
router.get('/SalesList/:pageNo/:perPage/:searchKeyword', AuthVerify, SalesList);
router.get('/SaleDelete/:id', AuthVerify, SaleDelete);


// return 
router.post('/CreateReturns', AuthVerify, CreateReturns);
router.get('/ReturnsList/:pageNo/:perPage/:searchKeyword', AuthVerify, ReturnsList);
router.get('/ReturnDelete/:id', AuthVerify, ReturnDelete);


// Report 
router.post('/ExpensesByDate', AuthVerify, ExpensesByDate);
router.post('/ReturnByDate', AuthVerify, ReturnByDate);
router.post('/PurchaseByDate', AuthVerify, PurchaseByDate);
router.post('/SalesByDate', AuthVerify, SalesByDate);


// summary
router.get('/ExpensesSummary', AuthVerify, ExpensesSummary);
router.get('/ReturnSummary', AuthVerify, ReturnSummary);
router.get('/PurchasesSummary', AuthVerify, PurchaseSummary);
router.get('/SalesSummary', AuthVerify, SalesSummary);



module.exports = router;