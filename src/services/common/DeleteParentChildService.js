const mongoose = require('mongoose');

const DeleteParentChildeService = async (Request, ParentModel, ChildsModel, JoinPropertyName) => {
    const session = await mongoose.startSession();
    try {
        // begin transaction
        await session.startTransaction();

        // parent creation
        let DeleteId = Request.params.id;
        let UserEmail = Request.headers['email'];

        let ChildQueryObject = {
            [JoinPropertyName]: DeleteId,
            UserEmail: UserEmail
        };

        // ChildQueryObject[JoinPropertyName] = DeleteId;
        // ChildQueryObject[UserEmail] = UserEmail;

        let ParentQueryObject = {
            _id: DeleteId,
            UserEmail: UserEmail
        };

        // ParentQueryObject['_id'] = DeleteId;
        // ParentQueryObject[UserEmail] = UserEmail;


        let ChildsDelete = await ChildsModel.remove(ChildQueryObject).session(session);
        let ParentDelete = await ParentModel.remove(ParentQueryObject).session(session);

        // Commit Transaction
        await session.commitTransaction();
        session.endSession();

        return { status: 'success', Parent: ParentDelete, Childs: ChildsDelete };

    } catch (error) {

        // role back transaction
        await session.abortTransaction();
        session.endSession();
        return { status: 'fail', data: error.toString() };

    }
}

module.exports = DeleteParentChildeService;