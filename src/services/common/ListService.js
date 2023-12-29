const ListService = async (Request, DataModel, SearchArray) => {
    try {
        const pageNo = Number(Request.params.pageNo);
        const perPage = Number(Request.params.perPage);
        const searchValue = Request.headers['email'];

        const skipRow = (pageNo - 1) * perPage;

        let data;

        if (searchValue !== '0') {
            let searchQuery = { $or: SearchArray };

            data = await DataModel.aggregate([
                { $match: { UserEmail: UserEmail } },
                { $match: searchQuery },
                {
                    $facet: {
                        Total: [{ $count: 'count' }],
                        Rows: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ]);

        } else {
            data = await DataModel.aggregate([
                { $match: { UserEmail: UserEmail } },
                { $match: searchQuery },
                {
                    $facet: {
                        Total: [{ $count: 'count' }],
                        Rows: [{ $skip: skipRow }, { $limit: perPage }]
                    }
                }
            ]);
        }

        return { status: 'success', data: data };

    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
}


module.exports = ListService;