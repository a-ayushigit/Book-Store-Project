const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const cors = require('cors');
const  connectdb = require( './db/connect');
require('dotenv').config();

//Middleware 
app.use(cors());
app.use(express.json());
//helps in making connection to the frontend side 

app.get('/',(req,res)=>{
    res.send("Hello World !");
})

const start = async() =>{
    try {
    
    await connectdb(process.env.MONGO_URI);
     app.listen(port , console.log(`Server is listening to port  ${port}..`));
    }
    catch(error){
      console.log(error);
    }
 }
 
 start();