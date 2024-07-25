const express = require("express");
const Group = require("../models/Group");
const User = require('../models/User');

const createGroup = async (req , res) =>{
    const newGroup = await Group.create(req.body);
    const userId = req.params.userId;
    console.log(newGroup);
    try {
        console.log("new group created !!!");
       // await newGroup.save();
        console.log("new group saved !!!");
        //updat the user
        console.log(req.user);
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.groups.push({
            _id: newGroup._id,
            role: "creator"
        }); 
       
        console.log(user);
        await user.save();
        res.status(200).json(newGroup);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const deleteGroup = async (req,res) =>{
    try{
        const {id} = req.params;
        const result = await Group.find({_id : id});

        if (!result) {
         res.status(404).json({ message: 'Group does not exist ' });
        }

         res.status(200).send({ message: 'Group  deleted successfully ' })
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message}); 
    }
}

const getAllGroups = async(req , res) =>{
    try {
        const Groups = await Group.find({});
        res.status(200).json(Groups);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});  
    }
}

const getOneGroup = async(req , res) =>{
    try{
        const {id} = req.params ;
        const Groups = await Group.findById(id);
        res.status(200).json({Groups});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
}



const updateGroup = async (req , res)=>{

    try{
        const {id} = req.params;
        const result = await Group.findByIdAndUpdate(id ,
             {
              $set:req.body,
            } , {
                new:true
             });

        if(!result){
            res.status(400).json({ message: "Group not found" });
        }
        else {
            res.status(200).send({ message: 'Group updated successfully' });
        }
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message}); 
    }
}

const requestMember = async (req , res) =>{
    const groupId = req.params.id;
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const userDetails = {
        id:user._id,
        name:user.fullname
    }
    const group = await Group.findById(groupId);
    try{
       if(!group.pendingMembers.includes(userId) && !group.members.includes(userId)){
       group.pendingMembers.push(userDetails);
       await group.save();
       res.status(200).json({message : "Request sent successfully"})
       
       }
       else{
        res.status(400).json({message : "Already requested or a member"});
       } 

    }
    catch(err){
        console.log(err);
    }
}

const acceptMember = async (req , res) =>{
    const groupId = req.params.id;
    const group = await Group.findById(groupId);
    const user = await User.findById(req.params.userId);
    try{
        if (group.moderators.some((moderator)=> moderator.id.equals(req.user._id)) || (group.createdBy.id.equals(req.user._id))){
            const userIndex = group.pendingMembers.findIndex((member) => member.id.equals(user._id));
            //check if the user exists or not in list  of pending members
            console.log(userIndex);
            if(userIndex > -1){
                group.pendingMembers.splice(userIndex , 1);
                group.members.push({
                    id:user._id ,
                    name:user.fullname

            });
                await group.save()
                res.status(200).json({"message":"Added successfully to the group"});

            }
            else{
            
                res.status(400).json({"message":"User not found in pending member list"});
            }
        }
        else{
            res.status(400).json({"message":"You are not a moderator of this group"});
        }

    }
    catch(err){
        console.log(err);
    }
}

const rejectMember = async (req , res) =>{
    const groupId = req.params.id;
    const group = await Group.findById(groupId);
    try{
        if (group.moderators.includes(req.user._id) || group.createdBy.id.equals(req.user._id)){
            const userIndex = group.pendingMembers.indexOf(req.params.userId);
            if(userIndex > -1){
                group.pendingMembers.splice(userIndex, 1);
                await group.save().then(res.status(200).json({"message":"Rejected successfully"}).catch((err)=>{console.log(err)}));
            }
            else{
                res.status(400).json({"message":"User not found in pending member list"});
            }
        }
        else{
            res.status(400).json({"message":"You are not a moderator of this group"});
        }

    }
    catch(err){
        console.log(err);
    }
}

module.exports = {createGroup , deleteGroup , getAllGroups , getOneGroup , updateGroup , requestMember , acceptMember , rejectMember}