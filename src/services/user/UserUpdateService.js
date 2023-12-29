const UserUpdateService = async (Request, DataModel) => {
    try {
        const data = await DataModel.updateOne({ email: Request.headers['email'] }, Request.body);
        return { status: 'fail', data: data };
    } catch (error) {
        return { status: 'fail', error: error.toString() };
    }
}

module.exports = UserUpdateService;