const express = require("express");
const Review = require("../models/Review");


const createReview = async (req , res) =>{
    const newReview = new Review(req.body);
    console.log(newReview);
    try {
        const savedReview = await newReview.save();
        res.status(200).json(savedReview);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteReview = async (req,res) =>{
    try{
        const {id} = req.params;
        const result = await Review.find({_id : id});

        if (!result) {
         res.status(404).json({ message: 'Review does not exist ' });
        }

         res.status(200).send({ message: 'Review  deleted successfully ' })
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message}); 
    }
}

const getAllReviews = async(req , res) =>{
    try {
        const Reviews = await Review.find({});
        res.status(200).json(Reviews);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});  
    }
}

const getOneReview = async(req , res) =>{
    try{
        const {id} = req.params ;
        const Reviews = await Review.find({_id:id});
        res.status(200).json({Reviews});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
}

const updateReview = async (req , res)=>{
    try{
        const {id} = req.params;
        const result = await Review.findByIdAndUpdate(id ,
             {
              $set:req.body,
            } , {
                new:true
             });

        if(!result){
            res.status(400).json({ message: "Review not found" });
        }
        else {
            res.status(200).send({ message: 'Review updated successfully' });
        }
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message}); 
    }
}


module.exports = {createReview , deleteReview , getAllReviews , getOneReview , updateReview }