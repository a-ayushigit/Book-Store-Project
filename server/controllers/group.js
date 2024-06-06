const express = require("express");
const Group = require("../models/Group");


const createGroup = async (req , res) =>{
    const newGroup = new Group(req.body);
    console.log(newGroup);
    try {
        const savedGroup = await newGroup.save();
        res.status(200).json(savedGroup);
    } catch (error) {
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
        const Groups = await Group.find({_id:id});
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

module.exports = {createGroup , deleteGroup , getAllGroups , getOneGroup , updateGroup }