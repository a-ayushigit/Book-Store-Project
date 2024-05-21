const express = require("express");
const Cart = require("../models/Cart");

const createCart = async (req , res) =>{
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteCart = async (req,res) =>{
    try{
        const {id} = req.params;
        const result = await Cart.find({userId : id});

        if (!result) {
         res.status(404).json({ message: 'Cart does not exist ' });
        }

         res.status(200).send({ message: 'Cart  deleted successfully ' })
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message}); 
    }
}

const getAllCarts = async(req , res) =>{
    try {
        const carts = await Cart.find({});
        res.status(200).json(carts);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});  
    }
}

const getOneCart = async(req , res) =>{
    try{
        const {id} = req.params ;
        const cart = await Cart.findOne({userId:id});
        res.status(200).json({cart});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
}

const updateCart = async (req , res)=>{
    try{
        const {id} = req.params;
        const result = await Cart.findByIdAndUpdate(id ,
             {
              $set:req.body,
            } , {
                new:true
             });

        if(!result){
            res.status(400).json({ message: "Cart not found" });
        }
        else {
            res.status(200).send({ message: 'Cart updated successfully' });
        }
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message}); 
    }
}

module.exports = {createCart , deleteCart , getAllCarts , getOneCart , updateCart}