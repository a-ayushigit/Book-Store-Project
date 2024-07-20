const express = require("express");
const Discussion = require("../models/Discussion");


const createDiscussion = async (req , res) =>{
    const newDiscussion = new Discussion(req.body);
    
    console.log(newDiscussion);
    try {
        const savedDiscussion = await newDiscussion.save();
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
    try {
        const Discussions = await Discussion.find({});
        res.status(200).json(Discussions);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});  
    }
}

const getOneDiscussion = async(req , res) =>{
    try{
        const {id} = req.params ;
        const Discussions = await Discussion.find({_id:id});
        res.status(200).json({Discussions});
    }
    catch(error){
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

module.exports = {createDiscussion , deleteDiscussion , getAllDiscussions , getOneDiscussion , updateDiscussion }