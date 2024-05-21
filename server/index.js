require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const cors = require('cors');
const  connectDB = require( './db/connect');

const booksRouter = require('./routes/Booksroute')
const authRouter = require('./routes/AuthRoute')
const userAdminRouter = require('./routes/UserAdminRoute')
const orderRouter = require('./routes/OrderRoute');
const cartRouter = require('./routes/CartRoute');
const cookieParser = require('cookie-parser');

//Middleware 
app.use(cors(
  {
      credentials:true,
      origin:'http://localhost:5173'
  }
));
app.use(express.json());

//helps in making connection to the frontend side 
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("Hello World !");
})

app.use('/api/v1/books', booksRouter);//marks the routes of the website api endpoints 
app.use('/api/v1/auth' , authRouter);
app.use('/api/v1/userAdmin' , userAdminRouter);
app.use('/api/v1/orders' , orderRouter);
app.use('/api/v1/carts' , cartRouter);

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

