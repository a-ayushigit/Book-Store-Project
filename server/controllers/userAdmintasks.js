const bcrypt = require('bcryptjs');
const User = require('../models/User');


const bcryptSalt = bcrypt.genSaltSync(10);

const updateUser = async (req,res) =>{
     if(req.body.password){
        req.body.password = bcrypt.hashSync(req.body.password,bcryptSalt);
     }
     try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true})
        res.status(200).json(updatedUser);
     } catch (error) {
        res.status(500).json(error);
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