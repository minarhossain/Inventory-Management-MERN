const UserVerifyOtpService = async (Request, DataModel) => {
    try {
        const email = Request.params.email;
        const OTPCode = Request.params.otp;
        const status = 0;
        const statusUpdate = 1;

        const OTPCount = await DataModel.aggregate([{ $match: { email: email, otp: OTPCode, status: status } }, { $count: 'total' }]);
        if (OTPCount.length > 0) {
            const OTPUpdate = await DataModel.updateOne({ email: email, otp: OTPCode }, { email: email, otp: OTPCode, status: statusUpdate });
            return { status: 'success', data: OTPUpdate };
        } else {
            return { status: 'fail', data: 'Invalid OTP Code' };
        }

    } catch (error) {
        console.error('Error in user verify Otp service', error);
        return { status: 'fail', data: 'An error occurred while verifying OTP.' };
    }
}

module.exports = UserVerifyOtpService;