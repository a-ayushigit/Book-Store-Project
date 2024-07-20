const mongoose = require('mongoose');
//add encryption to messages  
const messageSchema = new mongoose.Schema({

    senderId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required : true
    } , 
    receiverId:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required : true
    } ,
    message :{
        type:String , 
        required : true
    }

}, {
    timestamps : true
})

module.exports = mongoose.model('Message' , messageSchema);
