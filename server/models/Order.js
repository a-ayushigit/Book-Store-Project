const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
   userId:{type:mongoose.Schema.Types.ObjectId , required:true , ref:"Users"} , 
   books:[{
    bookId:{type:mongoose.Schema.Types.ObjectId , required:true , ref:"books"},
    quantity:{
        type:Number , default:1, 
    },
    title:{
        type:String,
        required:true,
        ref:"Books"
    },
    author:{
        type:String,
        required:true,
        ref:"Books"
    },
    publishYear:{
        type:Number ,
        required:true,
        ref:"Books"
    },
    description:{
        type:String,
        ref:"Books"
    },
    category:{
        type:Array,
        ref:"Books"
    },
    imageUrl:{
        type:String,
        required:true,
        ref:"Books"
    },
    price:{
        type:Number , 
        required:true,
        ref:"Books"
    } , 
    language: {
        type:String ,
        required:true,
        ref:"Books"
    },
    binding:{
        type:String , 
        required:true,
        ref:"Books"
    },
    tags:{
        type:Array,
        required:true,
        ref:"Books"
    },
    discount:{
        type:Number ,
        ref:"Books"
    },
    rating:{
        type:Number,
        ref:"Books"
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