const jwt = require("jsonwebtoken");

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

const verifyTokenAndModeratorOrCreator = (req, res, next) => {
    verifyTokenAndAuthorization(req, res, () => {
        // if(req.user.isModerator ){
        //     next();
        // }
        // else{
        //     res.status(403).json("Not authorized to do that !");
        // }
        const groupId = req.body.groupId;
        if (req.user.groups.includes({
            _id: groupId, roles: [
                {
                    $or: ['creator', 'moderator']

                }
            ]
        }
        )) {
            next();
        }
        else {
            res.status(403).json("Not authorized to do that!");
        }
    })
}

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndModeratorOrCreator, verifyTokenAndAdmin };