const UpdateService = async (Request, DataModel) => {
    try {
        const UserEmail = Request.headers['email'];
        const id = Request.params.id;
        const PostBody = Request.body;
        const data = await DataModel.updateOne({ _id: id, UserEmail: UserEmail }, PostBody);
        return { status: 'success', data: data };
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
}

module.exports = UpdateService;