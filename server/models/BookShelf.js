const mongoose = require("mongoose");

const bookshelfSchema = new mongoose.Schema({
   name:{
    type:String , 
    unique:true , 
    required:true
   },
   books:{
    type:Array
   }

},
    {
        timestamps:true,
    }
)

module.exports = mongoose.model("Bookshelves" , bookshelfSchema);