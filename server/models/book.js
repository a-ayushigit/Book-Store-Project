const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,

    },
    publishYear:{
        type:Number ,
        required:true,
    },
    description:{
        type:String,

    },
    category:{
        type:Array,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    price:{
        type:Number , 
        required:true,
    }

},

{
    timestamps:true ,
}
)

module.exports = mongoose.model('Book' , bookSchema);