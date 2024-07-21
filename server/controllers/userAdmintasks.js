const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { uploadOnCloudinary} = require('../utils/cloudinary');
let fs = require("fs");
const bcryptSalt = bcrypt.genSaltSync(10);

const updateUser = async (req,res) =>{
    console.log("Hello");
     if(req.body.password){
        req.body.password = bcrypt.hashSync(req.body.password,bcryptSalt);
     }
     console.log("Hello2");
     try {
        console.log("Reading files...");
        console.log(req.files);
        console.log("avatar", req.files.avatar[0].path);
        let avatarLocalPath = req.files.avatar[0].path;
        //let coverImageLocalPath = req.files.cover[0].path;
        console.log(avatarLocalPath);
        // console.log(coverImageLocalPath);
        // if(coverImageLocalPath) {
        //     const { secure_url: coverImageUrl } = await uploadOnCloudinary(coverImageLocalPath, 'covers');
        //     req.body.coverImage = coverImageUrl;
        //     fs.unlinkSync(coverImageLocalPath);
        // }
       // console.log("Uploaded cover image ");
        if(avatarLocalPath) {
            const { secure_url: avatarImageUrl } = await uploadOnCloudinary(avatarLocalPath, 'avatars');
            const response = await uploadOnCloudinary(avatarLocalPath, 'avatars');
            console.log(response);
            req.body.avatarImage = avatarImageUrl;
            fs.unlinkSync(avatarLocalPath);
        }
        console.log("Uploaded avatar image ");
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body,
          
        },{new:true})
        console.log(updatedUser);
        res.status(200).json(updatedUser);
     } catch (error) {
        res.status(500).json(error);
        console.log("Error updating the user :" , error.message);

     }


}

const deleteUser = async(req , res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted ....")
        
    } catch (error) {
        res.status(500).json(error);
    }
}

const getUser = async(req , res) =>{
    try {
       const user = await User.findById(req.params.id);
       const {password , ...others} = user._doc;
       res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getUsers = async(req , res) =>{
    const query = req.query.new;


    try {
       const users = query? await User.find().sort({
        _id:-1,
       }).limit(5): await User.find();
       res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getStats = async(req , res) =>{
const date = new Date();
const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
try {
    const data = await User.aggregate([
        { $match:{createdAt:{ $gte : lastYear}}},
        {
            $project:{
                month:{ $month:"$createdAt"},
            }
        },
        {
            $group:{
                _id: "$month",
                total:{ $sum: 1},
            }
        }
    ]);
    res.status(200).json(data);
}catch (error) {
    res.status(500).json(error);
}
}

module.exports = {updateUser , deleteUser , getUser , getUsers , getStats};