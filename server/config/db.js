const mongoose = require('mongoose');

const options = { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };

module.exports = (dbConnection) => {
    mongoose.set('strictQuery', false);    
    mongoose.connect(dbConnection, options);

}

