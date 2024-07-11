const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
   userId:{
    type:mongoose.Schema.Types.ObjectId, 
    unique:true , 
    required:true,
    ref:"Users"
   },
   bookId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Books"
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