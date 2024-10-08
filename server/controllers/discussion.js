const express = require("express");
const Discussion = require("../models/Discussion");
const Group = require("../models/Group");


const createDiscussion = async (req , res) =>{
    const newDiscussion = new Discussion(req.body);
    
    console.log(newDiscussion);
    try {
        const savedDiscussion = await newDiscussion.save();
        if(savedDiscussion.group){
            const group = await Group.findById(savedDiscussion.group);
            group.discussions.push(savedDiscussion._id);
            group.save();
        }
        res.status(200).json(savedDiscussion);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteDiscussion = async (req,res) =>{
    try{
        const {id} = req.params;
        const result = await Discussion.find({_id : id});

        if (!result) {
         res.status(404).json({ message: 'Discussion does not exist ' });
        }

         res.status(200).send({ message: 'Discussion  deleted successfully ' })
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message}); 
    }
}

const getAllDiscussions = async(req , res) =>{
    const queryParams = req.query?.groupId;
    try {
        if(queryParams){
            const discussions = await Discussion.find({group : queryParams}).populate({
                path:"createdBy",
                select:'fullname'
            });
            res.status(200).json(discussions);
            return;
        }
        else {
            const discussions = await Discussion.find({});
            res.status(200).json(discussions);
        }
       
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});  
    }
}

const getOneDiscussion = async(req , res) =>{
    try{
        const {id} = req.params ;
        const Discussions = await Discussion.findById(id).populate({
            path:"createdBy",
            select:'fullname'
        });
        res.status(200).json({Discussions});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
}

//not used 
const getDiscussionsbyGroup = async(req,res) =>{
    try {
        
        const {groupid} = req.params;
        console.log("groupid" , groupid);
        const discussions = await Discussion.find({
            "group":groupid
        })
        console.log("discussions" , discussions);
        res.status(200).json({discussions});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
}

const updateDiscussion = async (req , res)=>{

    try{
        const {id} = req.params;
        const result = await Discussion.findByIdAndUpdate(id ,
             {
              $set:req.body,
            } , {
                new:true
             });

        if(!result){
            res.status(400).json({ message: "Discussion not found" });
        }
        else {
            res.status(200).send({ message: 'Discussion updated successfully' });
        }
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message}); 
    }
}

module.exports = {createDiscussion , deleteDiscussion , getAllDiscussions , getOneDiscussion , updateDiscussion , getDiscussionsbyGroup}