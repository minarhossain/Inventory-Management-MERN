const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    email: { type: String },
    otp: { type: String },
    status: { type: Number, default: 0 },
    createdAt: {
        type: Date,
        default: Date.now,

    }

}, { versionKey: false });

const OTPSModel = mongoose.model('otps', OTPSchema);
module.exports = OTPSModel;