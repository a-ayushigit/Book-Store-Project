const express = require("express");
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const bcryptSalt = bcrypt.genSaltSync(10);

const register = async(req , res)=>{
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,bcryptSalt),
    })
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        //console.log(savedUser);
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
            res.status(200).json('pass ok');
        }
        else{
            res.status(401).json('pass not ok ');
        }
    }
    else{
        res.status(404).json('not found');
    }

}

module.exports = {
    register , login
};