const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: String },
    password: { type: String },
    photo: { type: String },
    createdAt: { type: Date, default: Date.now() }
}, { timestamps: true, versionKey: false });

const UsersModel = mongoose.model('Users', userSchema);
module.exports = UsersModel;