const express = require("express");
const Comment = require("../models/Comment");


const createComment = async (req , res) =>{
    const newComment = new Comment(req.body);
    console.log(newComment);
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteComment = async (req,res) =>{
    try{
        const {id} = req.params;
        const result = await Comment.find({_id : id});

        if (!result) {
         res.status(404).json({ message: 'Comment does not exist ' });
        }

         res.status(200).send({ message: 'Comment  deleted successfully ' })
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message}); 
    }
}

const getAllComments = async(req , res) =>{
    try {
        const Comments = await Comment.find({});
        res.status(200).json(Comments);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});  
    }
}

const getOneComment = async(req , res) =>{
    try{
        const {id} = req.params ;
        const Comments = await Comment.find({_id:id});
        res.status(200).json({Comments});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
}

const updateComment = async (req , res)=>{
    try{
        const {id} = req.params;
        const result = await Comment.findByIdAndUpdate(id ,
             {
              $set:req.body,
            } , {
                new:true
             });

        if(!result){
            res.status(400).json({ message: "Comment not found" });
        }
        else {
            res.status(200).send({ message: 'Comment updated successfully' });
        }
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message}); 
    }
}

const addOrUpdateComment = async(req,res)=> {
    const {userId , discussionId , value , items} = req.body;
    try {
        // first I am searching if the root comment exists or not , if it does not exists , I am creating the root comment 
        let rootComment = await Comment.findOne({discussion : discussionId , userId});
        if(!rootComment){
            rootComment = await Comment.create({
                userId,
                discussion:discussionId,
                value,
                items
            })
        }
    } catch (error) {
        
    }
}


module.exports = {createComment , deleteComment , getAllComments , getOneComment , updateComment }