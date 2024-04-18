const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const cors = require('cors');
const  connectDB = require( './db/connect');
require('dotenv').config();
const booksRouter = require('./routes/Booksroute')


//Middleware 
app.use(cors());
app.use(express.json());
//helps in making connection to the frontend side 

app.get('/',(req,res)=>{
    res.send("Hello World !");
})

app.use('/api/v1/books', booksRouter);

const start = async() =>{
    try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port , console.log(`Server is listening to port  ${port}..`));
    }
    catch(error){
      console.log(error);
    }
 }
 
 start();