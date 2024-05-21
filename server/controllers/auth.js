const express = require("express");
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const cookieParser = require('cookie-parser');

//require('dotenv').config();
app.use(cookieParser());


const bcryptSalt = bcrypt.genSaltSync(10);

const register = async(req , res)=>{
    console.log(req.body.email);
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,bcryptSalt),
    })
    try {
        console.log("hello")
        const existinguser = await User.findOne({email:req.body.email});
        if(!existinguser){
        console.log("hi")
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        }
        else{
            res.status(401).send('User already exists ');
        }
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

const login = async(req , res)=>{
    const passwordextract = req.body.password;
    const user = await User.findOne({ email: req.body.email});
    if(user){
        const passok = bcrypt.compareSync(passwordextract , user.password);

        if(passok){
            jwt.sign({email:user.email , id:user._id , isAdmin:user.isAdmin } ,process.env.JWT_SECRET ,{expiresIn:"3d"},(err,token)=>{
                if(err) throw err;
                res.status(200).cookie('token' , token).json(user);
            }  )
           
        }
        else{
            res.status(401).json('pass not ok ');
        }
    }
    else{
        res.status(404).json('not found');
    }

}

const profile = async(req , res)=>{
    const {token} = req.cookies;
    
    try {
        if(token){
            jwt.verify(token , process.env.JWT_SECRET , {} , async(err,userData)=>{
                if(err) throw err ;
                const{username , email, _id } = await User.findById(userData.id);
                res.json({username , email , _id});
            })
           // console.log(res.json({username , email , _id}));
        }
        else {
            res.json(null);
            //console.log(res);
        }
        
    } catch (error) {
        console.log(error);
    }
   

}

const logout = async(req,res)=>{
    try{
        res.cookie('token' , '').json(true);
    }
    catch(err){
        console.log(err);
    }
   
}

module.exports = {
    register , login , profile , logout
};