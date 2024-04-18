require('dotenv').config();

const connectDB = require("./db/connect");
const Book = require("./models/book");

const jsonBooks = require("./books.json");

const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI);
        console.log("Success!!!");
        await Book.deleteMany();
        await Book.create(jsonBooks);
        process.exit(0);

    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

start();