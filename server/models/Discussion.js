const mongoose = require('mongoose');

const DiscussionSchema = new mongoose.Schema({
    topic:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Books'
    },
    group:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Groups'
    },
    comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comments'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Discussion', DiscussionSchema);