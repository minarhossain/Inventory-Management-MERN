const OTPSModel = require("../../models/Users/OTPSModel");
const UsersModel = require("../../models/Users/UsersModel");
const sendEmailUtility = require("../../utility/SendEmailUtility");


const UserVerifyEmailService = async (Request, DataModel) => {
    try {

        const email = Request.params.email;
        const OTPCode = Math.floor(Math.random() * 900000 + 100000);
        const UserCount = await DataModel.aggregate([{ $match: { email: email } }, { $count: 'total' }]);
        // const user = await DataModel.findOne({ email: email })
        // console.log("User is ", user);

        if (UserCount.length > 0) {

            await OTPSModel.findOneAndUpdate({ email: email }, { otp: OTPCode }, { upsert: true }); // first object find the user second object update opt code if exists third object if not exists create a new otp code

            const sendEmail = await sendEmailUtility(email, "Your Otp code is " + OTPCode, 'Inventory PIN Verification');
            return { status: 'success', data: sendEmail };
        }
    } catch (error) {
        return { status: 'fail', data: 'No User Found' };
    }
}

module.exports = UserVerifyEmailService;