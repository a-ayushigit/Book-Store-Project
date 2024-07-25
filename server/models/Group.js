const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdBy: {
        name: {
            type: String,
            required: true,
            ref: "Users"
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Users"
        }


    },
    description: {
        type: String,
        required: true
    },
    rules: {
        type: String,
        required: true
    },
    members: [{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }, 
        name:{
            type: String,
            ref: 'Users'
        }
        
    }],

    bookshelf:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bookshelves"
        },
        name:{
            type: String,
            ref: "Bookshelves"
        }

    },
    moderators: [{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        }, 
        name:{
            type: String,
            ref: 'Users'
        }
    }
    ],
    tags: {
        type: Array,
    },
    category: {
        type: Array,
    },
    discussions: {
        type: Array,
    },
    pendingMembers: [
        {
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users'
            }, 
            name:{
                type: String,
                ref: 'Users'
            }
        }
    ],
    isPublic: {
        type: Boolean,
        default: true
    },
    isPrivate: {
        type: Boolean,
        default: false
    }

},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Groups', GroupSchema);