const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (token) {

            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(403).json("Invalid token !");
                req.user = user;//gets the user or err after decoding the token 
                next();
            });
        }
        else {
            return res.status(401).json("Not authorized !")
        }
    } catch (error) {
        console.log(error);
    }


}


const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        //console.log("request" , req);
        // console.log("request user", req.user);
        // console.log("request user id ",req.user._id);
        // console.log("user id from frontend ",req.params.id);
        if (((req.user._id === req.params.id) || req.user.isAdmin)) {
            next();
        }
        else {
            res.status(403).json("Not authorized to do that !");
        }
    });

}

//only admin allowed tasks 
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {

        if (req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("Not authorized to do that !");
        }
    });

}

const verifyTokenAndModeratorOrCreator =  (req, res, next) => {
    verifyToken(req, res, async() => {
        // if(req.user.isModerator ){
        //     next();
        // }
        // else{
        //     res.status(403).json("Not authorized to do that !");
        // }
        // if (((req.user._id === req.params.id) || req.user.isAdmin)) {
        //     next();
        // }
        // else {
        //     res.status(403).json("Not authorized to do that !");
        // }
        const groupId = req.params.id;
        // if (req.user.groups.includes({
        //     _id: groupId, roles: [
        //         {
        //             $or: ['creator', 'moderator']

        //         }
        //     ]
        // }
    // ))
    const user = await User.findById(req.user._id);
        const isAuthorized = user.groups?.some((group) => 
        group._id.equals(groupId) 
    // && (group.roles.includes('creator') || group.roles.includes('moderator'))
    );
    console.log("user groups ",user.groups);
    console.log("value ",isAuthorized);
    // console.log(user);
    // req.user.groups.some((group) => group._id.equals(groupId))
        if(isAuthorized)
         {
            next();
        }
        else {
            res.status(403).json("Not authorized to do that!");
        }
    })
}

const verifyTokenAndAuthorizationCreateBookshelf = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log("user_id", req.user._id);
            console.log("params", req.params);
            console.log("body" , req.body);
        //     console.log(req.user._id === req.body?.ownerId);
        //     console.log(req.params?.id === req.body?.ownerId)
        
        if((req.body.type === 'Users') && (req.user._id === req.body?.ownerId) ){
            next();
        }
        else if ((req.body.type === 'Groups') && (req.params?.groupId === req.body?.ownerId) ){
        next();
        }
        else {
            res.status(403).json("Not authorized to do that !");
        }
    });

}

const verifyTokenAndAuthorizationGetBookshelf = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log("user_id", req.user._id);
            console.log("params", req.params);
            console.log("body" , req.body);
            console.log("query" , req.query);
            console.log(req.user);
        //     console.log(req.user._id === req.body?.ownerId);
        //     console.log(req.params?.id === req.body?.ownerId)
        
        if ((req.query.type === 'Users') && (req.user._id === req.query?.ownerId)) {
            next();
          } else if ((req.query.type === 'Groups') && (req.params?.groupId === req.query?.ownerId)) {
            next();
          } else {
            res.status(403).json("Not authorized to do that!");
          }
    });

}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndModeratorOrCreator, verifyTokenAndAdmin , verifyTokenAndAuthorizationCreateBookshelf ,  verifyTokenAndAuthorizationGetBookshelf};