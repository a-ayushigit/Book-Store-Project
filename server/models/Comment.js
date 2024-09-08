const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
   userId:{
    type:String , 
    unique:true , 
    required:true
   },
   discussion:{
    type:mongoose.Schema.Types.ObjectId, 
    ref:'Discussion',
    required:true
   },
   value:{
    type:String,
    required:true
   },
   items:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments"

    }
   ]
   

},
    {
        timestamps:true,
    }
)

module.exports = mongoose.model("Comments" , commentSchema);