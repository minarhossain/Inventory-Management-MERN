// user create or registration

const UserCreateService = async (Request, DataModel) => {
    try {
        const PostBody = Request.body;
        const data = await DataModel.create(PostBody);
        return { status: 'success', data: data };
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
}

module.exports = UserCreateService;