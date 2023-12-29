const DropDownService = async (Request, DataModel, Projection) => {
    try {
        const UserEmail = Request.headers['email'];
        const data = await DataModel.aggregate([
            { $match: { UserEmail: UserEmail } },
            { $project: Projection }
        ]);
        return { status: 'success', data: data };
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
}

module.exports = DropDownService;








// const DropDownService = async (request, DataModel, projection) => {
//     try {
//         const userEmail = request.headers['email'];
//         const data = await DataModel.find({ UserEmail: userEmail }).select(projection);
//         return { status: 'success', data: data };
//     } catch (error) {
//         return { status: 'fail', data: error.toString() };
//     }
// }

// module.exports = DropDownService;
