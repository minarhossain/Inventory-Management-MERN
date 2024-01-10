const ExpenseModel = require("../../models/Expenses/ExpenseModel");

const ExpenseReportService = async (Request) => {
    try {
        const UserEmail = Request.headers["email"];
        const FormDate = Request.body['FormDate'];
        const ToDate = Request.body['ToDate'];

        const data = await ExpenseModel.aggregate([
            { $match: { UserEmail: UserEmail, CreatedDate: { $gte: new Date(FormDate), $lte: new Date(ToDate) } } },
            {
                $facet: {
                    Total: [{
                        $group: {
                            _id: 0,
                            TotalAmount: { $sum: "$Amount" }
                        }
                    }],
                    Rows: [
                        { $lookup: { from: 'expensetypes', localField: "TypeId", foreignField: '_id', as: 'Type' } }
                    ]
                }
            }
        ])
        return { status: 'success', data: data };
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
}

module.exports = ExpenseReportService;