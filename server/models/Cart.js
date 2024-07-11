const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
   userId:{type:String , required:true} , 
   books:[{
    bookId:{type:mongoose.Schema.Types.ObjectId , ref:'Books'},
    quantity:{
        type:Number , default:1,
    }
   }] // books will be an array of object book 


},{
    timestamps:true,
});

module.exports = mongoose.model("Cart" , CartSchema);