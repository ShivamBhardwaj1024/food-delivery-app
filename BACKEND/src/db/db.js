const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log(`DB Connected successfully`);
    })
    .catch((err) => {
        console.log(`DB Connrction Failed ${err}`)
    })
};

module.exports = connectDB;

