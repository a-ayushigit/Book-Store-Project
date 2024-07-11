const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    name:{
      type:String ,
      required:true,
      unique:true   
    } , 
    createdBy:{
        type:String,
        required:true,
        ref:"Users"
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
        ref:"Bookshelves"

    },
    moderators:[
       { 
        type: mongoose.Schema.Types.ObjectId,
        ref:"Users",
    }
    ],
    tags:{
        type:Array,
    },
    category:{
        type:Array,
    }, 
    discussions:{
        type:Array ,
    },
    pendingMembers:[
        { 
         type: mongoose.Schema.Types.ObjectId,
         ref:"Users",
     }
     ],
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