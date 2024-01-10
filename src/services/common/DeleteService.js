const DeleteService = async (Request, Model) => {
    try {
        const DeleteId = Request.params.id;
        const UserEmail = Request.headers['email'];

        const QueryObject = {
            _id: DeleteId,
            UserEmail: UserEmail
        }

        const Delete = await Model.deleteMany(QueryObject);
        return { status: 'success', delete: Delete }

    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
}

module.exports = DeleteService;