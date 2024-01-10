const { default: mongoose } = require("mongoose");


const DetailsByIdService = async (Request, DataModel) => {
    try {
        const DetailsId = Request.params.id;
        const UserEmail = Request.headers['email'];
        const ObjectId = mongoose.Types.ObjectId;

        const QueryObject = {
            _id: ObjectId(DetailsId),
            UserEmail: UserEmail
        }

        const data = await DataModel.aggregate([
            { $match: QueryObject }
        ])
        return { status: 'success', data: data }
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
}

module.exports = DetailsByIdService;