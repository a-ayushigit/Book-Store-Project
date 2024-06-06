const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
   userId:{
    type:String , 
    unique:true , 
    required:true
   },
   bookshelfName:{
    type:String
   },
   description:{
    type:String,
    required:true
   },
   like:{
    type:Number
   }
   

},
    {
        timestamps:true,
    }
)

module.exports = mongoose.model("Comment" , commentSchema);