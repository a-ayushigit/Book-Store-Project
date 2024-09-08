const express = require("express");
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const cookieParser = require('cookie-parser');

//require('dotenv').config();
app.use(cookieParser());


const bcryptSalt = bcrypt.genSaltSync(10);

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        //console.log(accessToken, refreshToken);
        user.refreshToken = refreshToken;//updating the database 
        //console.log("ghello 1");
        //console.log(user);
        await user.save({ validateBeforeSave: false});
        //console.log("ghello 2");

        return { accessToken, refreshToken };


    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong while generating the access and refresh token !");
    }
}

const register = async (req, res) => {
    //console.log(req.body.email);
    const {username, fullname, email, password} = req.body;
    //console.log("Register Password " , password);
    try {
        
        const newUser = new User({
            username,
            email,
            password,
            fullname,
        })
        if ([username, fullname, email, password].some((field) => field?.trim() === ''))
            return res.status(400).send("All fields are required !");
        const existinguser = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (!existinguser) {
            //console.log("hi")
            const savedUser = await newUser.save();
            const { username, email, _id, fullname } = await User.findById(savedUser._id)
            return res.status(201).json({ username, email, _id, fullname, message: "User registered successfully" });
        }
        else {
            return res.status(401).send('User already exists ');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);

    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(401).json("Email and Password required !");
        //console.log("Login password ",password);
        //console.log("login 1");
        const user = await User.findOne(
            {
                email:email
            }
        );
        //console.log("login 2");
        if (user) {
            const passok = await user.isPasswordCorrect(password);
            //console.log(passok);
            //console.log("user id" , user._id);
            if (passok) {
                const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
                const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

                const options = {
                    httpOnly: true,
                    // secure: true,
                    sameSite: 'None'
                }



                return res.status(200)
                    .cookie('accessToken', accessToken, options)
                    .cookie('refreshToken', refreshToken, options)
                    .json({ loggedInUser, accessToken, refreshToken, message: "User logged in successfully" });
            }
            else {
                return res.status(401).json('password not ok : Invalid Credentials! ');
            }
        }
        else {
            return res.status(404).json('User not found !');
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json("Internal Server Error");
    }

}

const profile = async (req, res) => {
   
    // console.log(req);
    try {
        const  accessToken  = req.cookies.accessToken;
        console.log("hello1 from profile")
        // console.log("token",token);
        //console.log("Hello profile 3");
        //console.log(typeof(accessToken));
        
        //console.log("Hello profile 2");
        // if(accessToken === "" ) {
        //     console.log("Returning Function!");
        //     return res.status(200).json("Log in to get access");
        // }
        if (accessToken) {
            
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, {}, async (err, userData) => {
                if (err) throw err;
                const user = await User.findById(userData._id).select("-password -refreshToken");
                res.json(user);
                //console.log(user);
                //console.log("Hello profile 1");
            })
            // console.log(res.json({username , email , _id}));
            console.log("Hello profile 4");
        }
        else {
            res.status(401).json("Unauthorized request");
            //console.log("Hello profile 5");
            //console.log(res);
        }

    } catch (error) {
        console.log(error);
        //console.log("Hello profile 6");
    }
    //    console.log("hello")

}

const refreshAccessToken = async(req , res) => {
    const incomingToken = req.cookies.refreshToken || req.body.refreshToken ;
    if (!incomingToken) return res.status(401).json("Unauthorized Access !");

    try {
        const decodedToken = jwt.verify(incomingToken ,process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id);
        if(!user) return res.status(401).json("Unauthorized Access");
        if(incomingToken !== user.refreshToken) return res.status(401).json("Refresh token is expired or used");

        //Generate new tokens 
        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken , newRefreshToken } = await generateAccessAndRefreshToken(user._id);
        return res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', newRefreshToken, options)
        .json({ accessToken, refreshToken: newRefreshToken, message: "Access token refreshed" });

        
    } catch (error) {
        console.log(error);
        return res.status(401).json(error?.message || "Invalid Refresh token");
    }
}

const logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id , 
            {
                $unset : {
                    refreshToken:1 // removed from db 
                }
            },
            {
                new:true
            }
        );
        const options = {
            httpOnly: true,
            // secure: true,
            sameSite: 'None'

        };


        return res.status(200).clearCookie('accessToken', options).clearCookie('refreshToken', options).json("User logged out!");
        // res.status(200).cookie('accessToken' , '' , options).json("User logged Out successfully!");
    }
    catch (err) {
        console.log(err);
        return res.status(500).json("Something went wrong !");
    }

}

module.exports = {
    register, login, profile, logout
};