const mongoose = require('mongoose');



const CreateParentChildService = async (Request, ParentModel, ChildModel, JoinPropertyName) => {
    try {

        // create transaction


        // parent creation

        let Parent = Request.body['Parent'];


        Parent.UserEmail = Request.headers['email'];

        const ParentCreation = await ParentModel(Parent).save();

        //chile creation

        if (ParentCreation['_id']) {
            try {

                let Childs = Request.body['Childs'];

                await Childs.forEach(element => {
                    element[JoinPropertyName] = ParentCreation['_id'];

                    element['UserEmail'] = Request.headers['email'];
                });

                let ChildCreation = await ChildModel.insertMany(Childs);

                return { status: 'success', Parent: ParentCreation, Childs: ChildCreation };

            } catch (error) {

                await ParentModel.remove({ _id: ParentCreation['_id'] });
                return { status: 'fail', data: 'Child Creation Failed' };

            }
        } else {
            return { status: 'fail', data: 'Parent Creation Failed' };
        }

        // return statement

    } catch (error) {
        return { status: 'fail', data: error.toString() };
    }
}

module.exports = CreateParentChildService;

/*

const CreateParentChildService = async (request, ParentModel, ChildModel, JoinPropertyName) => {
    try {
        // Parent creation
        const parentData = {
            ...request.body['Parent'],
            UserEmail: request.headers['email']
        };
        const parentCreation = await ParentModel.create(parentData);

        // Child creation
        const childData = request.body['Childs'].map(element => ({
            ...element,
            [JoinPropertyName]: parentCreation['_id'],
            UserEmail: request.headers['email']
        }));

        const childCreation = await ChildModel.insertMany(childData);

        return { status: 'success', Parent: parentCreation, Childs: childCreation };
    } catch (error) {
        if (error.name === 'ValidationError' && parentCreation) {
            // Handle validation error on child creation
            await ParentModel.findByIdAndRemove(parentCreation['_id']);
            return { status: 'fail', data: 'Child Creation Failed due to validation error' };
        } else {
            return { status: 'fail', data: error.toString() };
        }
    }
};

module.exports = CreateParentChildService;

*/