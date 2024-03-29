const ReturnProductsModel = require("../../models/Returns/ReturnProductsModel");

const ReturnReportService = async (Request) => {
    try {
        const UserEmail = Request.headers['email'];
        const FormDate = Request.body['FormDate'];
        const ToDate = Request.body['ToDate'];


        const data = await ReturnProductsModel.aggregate([
            { $match: { UserEmail: UserEmail, CreatedDate: { $gte: new Date(FormDate), $lte: new Date(ToDate) } } },
            {
                $facet: {
                    Total: [{
                        $group: {
                            _id: 0,
                            TotalAmount: { $sum: '$Total' }
                        }
                    }],
                    Rows: [
                        { $lookup: { from: 'products', localField: 'ProductId', foreignField: '_id', as: 'products' } },
                        { $unwind: '$products' },
                        { $lookup: { from: 'brands', localField: 'products.BrandId', foreignField: '_id', as: 'brands' } },
                        { $lookup: { from: 'categories', localField: 'products.CategoryId', foreignField: '_id', as: 'categories' } },
                    ]
                }
            }
        ])
        return { status: 'success', data: data };
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
}

module.exports = ReturnReportService;