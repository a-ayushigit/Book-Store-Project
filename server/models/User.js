const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bcryptSalt = bcrypt.genSaltSync(10);


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required !'],
    },
    refreshToken: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
   
   
 
    groups:[
        {
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "Groups"
            },
            role: {
                type: String,
                enum: ["creator", "moderator", "member"],
                default: "member"
            }

        }
    ],
    bookshelves: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bookshelves"
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Reviews"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comments"
        }
    ],
    profilePic: {
        type: String,
        default: ""
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }
    ],
    pendingFriends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }
    ],
    requestSendPeople: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        }
    ]

}, {
    timestamps: true
});

UserSchema.pre('save', async function ( next) {
    if (!this.isModified("password")) return next();//be sure to add the parameter 'password' to the isModified function , otherwise the hashed password changes every time the document is modified 
    this.password =  bcrypt.hashSync(this.password, bcryptSalt);
    console.log("Password before saving");
    console.log(this.password);
    next();
})

UserSchema.methods.isPasswordCorrect = async function (password) {
    console.log("isPasswordCorrect");
    console.log("Password after saving");
    console.log(this.password);
    console.log(typeof(password));
    return  bcrypt.compareSync(password, this.password);
}

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        username: this._username,
        email: this._email,
        fullname: this._fullname,
        isAdmin: this._isAdmin,
        isModerator: this._isModerator,
        groups: this._groups,
        moderatorGroups: this._moderatorGroups,
    }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
        }
    )
}

UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,

    }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
        }
    )
}



module.exports = mongoose.model("Users", UserSchema);