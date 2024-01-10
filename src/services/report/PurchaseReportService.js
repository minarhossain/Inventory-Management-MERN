const PurchaseProductsModel = require("../../models/Purchases/PurchasesModel");

const PurchaseReportService = async (Request) => {
    try {
        const UserEmail = Request.headers['email'];
        const FromDate = Request.body['FromDate'];
        const ToDate = Request.body['ToDate'];

        const data = await PurchaseProductsModel.aggregate([
            { $match: { UserEmail: UserEmail, CreatedDate: { $gte: new Date(FromDate), $lte: new Date(ToDate) } } },
            {
                $facet: {
                    Total: [{
                        $group: {
                            _id: 0,
                            TotalAmount: { $sum: "$Total" }
                        }
                    }],
                    Rows: [
                        { $lookup: { from: 'products', localField: 'ProductId', foreignField: '_id', as: 'products' } },
                        { $unwind: '$products' },
                        { $lookup: { from: 'brands', localField: 'products.BrandId', foreignField: '_id', as: 'brands' } },
                        { $lookup: { from: 'categories', localField: 'products.CategoryId', foreignField: '_id', as: 'categories' } }
                    ]
                }
            }
        ])

        return { status: 'success', data: data };
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
}

module.exports = PurchaseReportService;