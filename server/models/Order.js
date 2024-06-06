const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
   userId:{type:String , required:true} , 
   books:[{
    bookId:{type:String ,},
    quantity:{
        type:Number , default:1,
    },
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,

    },
    publishYear:{
        type:Number ,
        required:true,
    },
    description:{
        type:String,

    },
    category:{
        type:Array,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    price:{
        type:Number , 
        required:true,
    } , 
    language: {
        type:String ,
        required:true
    },
    binding:{
        type:String , 
        required:true
    },
    tags:{
        type:Array,
        required:true
    },
    discount:{
        type:Number 
    },
    rating:{
        type:Number
    }
   }], // books will be an array of object book
   amount:{type:Number , required:true}, 
   address:{type:String , required:true},
   status:{type:String , default:"pending"},

},
{
    timestamps:true,
}

);

module.exports = mongoose.model("Orders" , OrderSchema);