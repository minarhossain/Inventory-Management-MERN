
const CreateService = async (Request, DataModel) => {
    try {
        let PostBody = Request.body;
        PostBody.UserEmail = Request.headers['email'];

        const data = await DataModel.create(PostBody);
        return { status: 'success', data: data };
    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
}

module.exports = CreateService;