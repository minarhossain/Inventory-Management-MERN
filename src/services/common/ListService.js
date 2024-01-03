const ListService = async (Request, DataModel, SearchArray) => {
    try {
        const pageNo = Number(Request.params.pageNo);
        const perPage = Number(Request.params.perPage);
        const searchValue = Request.headers['email'];
        const skipRow = (pageNo - 1) * perPage;
        console.log('Request.params:', Request.params);
        console.log('Request.headers:', Request.headers);
        let data;
        let searchQuery;
        if (searchValue !== '0') {
            searchQuery = { $or: SearchArray };
            data = await DataModel.aggregate([
                { $match: { UserEmail: searchValue } },
                { $match: searchQuery },
                {
                    $facet: {
                        Total: [{ $count: 'count' }],
                        Rows: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ]);

        } else {
            searchQuery = {};
            data = await DataModel.aggregate([
                { $match: { UserEmail: searchValue } },
                { $match: searchQuery },
                {
                    $facet: {
                        Total: [{ $count: 'count' }],
                        Rows: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ]);
        }
        // let data = await DataModel.aggregate([
        //     { $match: { UserEmail: searchValue } },
        //     { $match: searchQuery },
        //     {
        //         $facet: {
        //             Total: [{ $count: 'count' }],
        //             Rows: [{ $skip: skipRow }, { $limit: perPage }]
        //         }
        //     }
        // ]);

        return { status: 'success', data: data };
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
}
module.exports = ListService;