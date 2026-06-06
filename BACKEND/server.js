// start server - 1) cd BACKEND 2) npx nodemon server.js

require(`dotenv`).config();   // process.env.JWT_SECRET ko use kr ne ke liye 
const app = require('./src/app');
const connectDB = require(`./src/db/db`);

connectDB();

const port = 3000;

app.listen(port , () => {
    console.log(`Server running on port ${port}`);
});

