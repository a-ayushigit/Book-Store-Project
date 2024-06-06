const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
   userId:{
    type:String , 
    unique:true , 
    required:true
   },
   bookId:{
    type:String
   },
   description:{
    type:String,
    required:true
   },
   ratings:{
    type:Number
   },
   like:{
    type:Number
   }

},
    {
        timestamps:true,
    }
)

module.exports = mongoose.model("Reviews" , reviewSchema);