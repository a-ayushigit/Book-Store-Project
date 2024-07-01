const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    name:{
      type:String ,
      required:true,
      unique:true   
    } , 
    createdBy:{
        type:Number,
        required:true
    },
    description:{
    type:String , 
    required:true
    },
    members:{
        type:Array,

    },
    bookshelf:{
        type:Array ,

    },
    moderators:{
        type:Array
    },
    tags:{
        type:Array,
    },
    category:{
        type:Array,
    }, 
    discussions:{
        type:Array ,
    },
    pendingMembers:{
        type:Array,
    }

},
    {
        timestamps:true ,
    }
)

module.exports = mongoose.model('Groups' , GroupSchema);