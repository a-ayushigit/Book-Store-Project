const mongoose = require("mongoose");

const bookshelfSchema = new mongoose.Schema({
   name:{
    type:String , 
    unique:true , 
    required:true
   },
   booksToRead:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Books"
   }

   ],
   owner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'owner.type'
    },
    type: {
      type: String,
      required: true,
      enum: ['Users', 'Groups']
    }
  },
   booksRead:[
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Books"
    }
   ]


},
    {
        timestamps:true,
    }
)

module.exports = mongoose.model("Bookshelves" , bookshelfSchema);