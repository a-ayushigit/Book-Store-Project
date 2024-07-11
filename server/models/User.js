const mongoose = require("mongoose");

 
const UserSchema = new mongoose.Schema({
    username:{type:String , required:true , unique:true},
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true} ,
    isAdmin:{
        type:Boolean, 
        default:false,
    },
    isModerator:{
        type:Boolean,
        default:false
    },
    groups:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Groups"
        }
    ],
    moderatorGroups:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Groups"
        }
    ],
    bookshelves:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Bookshelves"
        }
    ],
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Reviews"
        }
    ],
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comments"
        }
    ],
    profilePic:{
        type:String , 
        default:""
    },
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users"
        }
    ],
    pendingFriends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users"
        }
    ],
    requestSendPeople:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users"
        }
    ]

} , {
    timestamps:true
});

module.exports = mongoose.model("Users" , UserSchema);