const UsersModel = require("../../models/Users/UsersModel");
const OTPSModel = require("../../models/Users/OTPSModel");
const UserCreateService = require("../../services/user/UserCreateService");
const UserLoginService = require("../../services/user/UserLoginService");
const UserUpdateService = require("../../services/user/UserUpdateService");
const UserDetailsService = require("../../services/user/UserDetailsService");
const UserResetPassService = require("../../services/user/UserResetPassService");
const UserVerifyOtpService = require("../../services/user/UserVerifyOtpService");
const UserVerifyEmailService = require("../../services/user/UserVerifyEmailService");


exports.Registration = async (req, res) => {
    let result = await UserCreateService(req, UsersModel)
    res.status(200).json(result)
}

exports.Login = async (req, res) => {
    let result = await UserLoginService(req, UsersModel)
    res.status(200).json(result)
}

exports.ProfileUpdate = async (req, res) => {
    let Result = await UserUpdateService(req, UsersModel)
    res.status(200).json(Result)
}

exports.ProfileDetails = async (req, res) => {
    let result = await UserDetailsService(req, UsersModel)
    res.status(200).json(result)
}


exports.RecoverVerifyEmail = async (req, res) => {
    let result = await UserVerifyEmailService(req, UsersModel)
    res.status(200).json(result)
}


exports.RecoverVerifyOTP = async (req, res) => {
    let result = await UserVerifyOtpService(req, OTPSModel)
    res.status(200).json(result)
}

exports.RecoverResetPass = async (req, res) => {
    let result = await UserResetPassService(req, UsersModel)
    res.status(200).json(result)
}













