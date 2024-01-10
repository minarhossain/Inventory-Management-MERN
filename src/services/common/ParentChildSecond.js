// we can use CreateParentChildService second way

const mongoose = require('mongoose');

const CreateParentChildService = async (Request, ParentModel, ChildModel, JoinPropertyName) => {

    // create transaction session

    const session = await mongoose.startSession();

    try {

        // begin transaction transaction
        await session.startTransaction();


        //First Database Process
        let Parent = Request.body['Parent'];
        parent.UserEmail = Request.headers['email'];
        let ParentCreation = await ParentModel.create([Parent], { session });


        //  Second Database Process
        let Childs = Request.body['Childs'];
        await Childs.forEach((element) => {
            element[JoinPropertyName] = ParentCreation['_id'];
            element['UserEmail'] = Request.headers['email'];
        })


        let ChildsCreation = await ChildModel.insertMany(Childs, { session });


        // Transaction Success

        await session.commitTransaction();
        session.endSession();

        return { status: 'success', Parent: ParentCreation, Childs: ChildsCreation };

    } catch (error) {

        // Roll back Transaction if Fail
        await session.abortTransaction();
        session.endSession();
        return { status: 'fail', data: error.toString() };

    }
}


module.exports = CreateParentChildService;