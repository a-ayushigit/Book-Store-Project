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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
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
    moderators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
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
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
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