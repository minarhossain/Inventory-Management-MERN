const app = require('./app');

// database connection

const mongoose = require('mongoose');
const dbConnection = async () => {
    await mongoose.connect('mongodb://localhost:27017/INVENTORY-MANAGEMENT')
        .then(() => console.log('✅ DB Connected'))
        .catch(error => console.log(error))
}

const port = 5000;
app.listen(port, async () => {
    await dbConnection();
    console.log(`Running http://localhost:${port}`);

});


