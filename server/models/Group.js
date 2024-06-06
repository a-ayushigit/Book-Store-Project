const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    name:{
      type:String ,
      required:true,
      unique:true   
    } , 
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
    }

},
    {
        timestamps:true ,
    }
)

module.exports = mongoose.model('Group' , GroupSchema);