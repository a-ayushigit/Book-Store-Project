const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
   userId:{
    type:mongoose.Schema.Types.ObjectId, 
    
    required:true,
    ref:"Users"
   },
   bookId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"Books"
   },
   heading:{
    type:String,
    required:true
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
reviewSchema.index({userId:1 , bookId:1}, {unique : true});
module.exports = mongoose.model("Reviews" , reviewSchema);