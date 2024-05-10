const express = require("express");
const User = require('../models/User');
const bcrypt = require('bcryptjs');

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

}

module.exports = {
    register
};