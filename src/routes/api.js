const express = require('express');
const { Registration, Login, ProfileUpdate, ProfileDetails, RecoverVerifyEmail, RecoverVerifyOTP, RecoverResetPass } = require('../controllers/Users/UsersController');
const AuthVerify = require('../middlewares/AuthVerifyMiddleware');
const { CreateBrand, UpdateBrand, BrandList, BrandDropDown } = require('../controllers/Brands/BrandsController');
const { CreateCategories, UpdateCategories, CategoriesList, CategoriesDropDown } = require('../controllers/Categories/CategoriesController');
const { CreateCustomers, UpdateCustomers, CustomersList, CustomersDropDown } = require('../controllers/Customers/CustomersController');
const { CreateSuppliers, UpdateSuppliers, SuppliersList, SuppliersDropDown } = require('../controllers/Suppliers/SuppliersController');

const router = express.Router();


// user profile

router.post('/Registration', Registration)
router.post('/Login', Login);
router.post('/ProfileUpdate', AuthVerify, ProfileUpdate);
router.get('/ProfileDetails', AuthVerify, ProfileDetails);
router.get('/RecoverVerifyEmail/:email', RecoverVerifyEmail);
router.get('/RecoverVerifyOTP/:email/:otp', RecoverVerifyOTP);
router.post('/RecoverResetPass', RecoverResetPass)


// brands
router.post('/CreateBrand', AuthVerify, CreateBrand);
router.post('/UpdateBrand/:id', AuthVerify, UpdateBrand);
router.get('/BrandList/:pageNo/:perPage/:searchKeyword', AuthVerify, BrandList);
router.get('/BrandDropdown', AuthVerify, BrandDropDown);


// categories
router.post('/CreateCategories', AuthVerify, CreateCategories);
router.post('/UpdateCategories/:id', AuthVerify, UpdateCategories);
router.get('/CategoriesList/:pageNo/:perPage/:searchKeyword', AuthVerify, CategoriesList);
router.get('/CategoriesDropDown', AuthVerify, CategoriesDropDown);


// customers
router.post('/CreateCustomers', AuthVerify, CreateCustomers);
router.post('/UpdateCustomers/:id', AuthVerify, UpdateCustomers);
router.get('/CustomersList/:pageNo/:perPage/:searchKeyword', AuthVerify, CustomersList);
router.get('/CustomersDropDown', AuthVerify, CustomersDropDown);

// suppliers

router.post('/CreateSuppliers', AuthVerify, CreateSuppliers);
router.post('/UpdateSuppliers/:id', AuthVerify, UpdateSuppliers);
router.get('/SuppliersList/:pageNo/:perPage/:searchKeyword', AuthVerify, SuppliersList);
router.get('/SuppliersDropDown', AuthVerify, SuppliersDropDown);


module.exports = router;