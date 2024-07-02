const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    name:{
      type:String ,
      required:true,
      unique:true   
    } , 
    createdBy:{
        type:String,
        required:true
    },
    description:{
    type:String , 
    required:true
    },
    rules:{
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
    },
    isPublic:{
        type:Boolean,
        default:true
    },
    isPrivate:{
    type:Boolean,
    default:false
    }

},
    {
        timestamps:true ,
    }
)

module.exports = mongoose.model('Groups' , GroupSchema);