// import otpModel

const OTPSModel = require("../../models/Users/OTPSModel");

const UserResetPassService = async (Request, DataModel) => {
    try {
        const email = Request.body['email'];
        const OTPCode = Request.body['otp'];
        const NewPass = Request.body['password'];
        const statusUpdate = 1;
        const OTPUsedCount = await OTPSModel.aggregate([{ $match: { email: email, otp: OTPCode, status: statusUpdate } }]);
        if (OTPUsedCount.length > 0) {
            const PassUpdate = await DataModel.updateOne({ email: email }, { password: NewPass });
            return { status: 'success', data: PassUpdate };
        } else {
            return { status: 'fail', data: 'Invalid Request' };
        }
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }

}

module.exports = UserResetPassService;