const express = require("express");
const Order = require("../models/Order");

const createOrder = async (req , res) =>{
    const newOrder = new Order(req.body);
    console.log(newOrder);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteOrder = async (req,res) =>{
    try{
        const {id} = req.params;
        const result = await Order.find({userId : id});

        if (!result) {
         res.status(404).json({ message: 'Order does not exist ' });
        }

         res.status(200).send({ message: 'Order  deleted successfully ' })
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message}); 
    }
}

const getAllOrders = async(req , res) =>{
    try {
        const Orders = await Order.find({});
        res.status(200).json(Orders);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message : error.message});  
    }
}

const getOneOrder = async(req , res) =>{
    try{
        const {id} = req.params ;
        const Orders = await Order.find({userId:id});
        res.status(200).json({Orders});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message});
    }
}

const updateOrder = async (req , res)=>{
    try{
        const {id} = req.params;
        const result = await Order.findByIdAndUpdate(id ,
             {
              $set:req.body,
            } , {
                new:true
             });

        if(!result){
            res.status(400).json({ message: "Order not found" });
        }
        else {
            res.status(200).send({ message: 'Order updated successfully' });
        }
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message : error.message}); 
    }
}

const getIncome = async(req,res) =>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
       const income = await Order.aggregate([
        {$match : {createdAt : {$gte : previousMonth} }},  //orders grouped according to month , all orders after prev month
        {
            $project :{
                month :{
                    $month:"$createdAt"
                },
                sales:"$amount",
            }
        },
        {
            $group:{
                _id:"$month" ,
                total:{$sum : "$sales"}
            }
        }
        
        
       ]) ;
       res.status(200).json(income);

    } catch (error) {
        res.status(500).json(error);
    }
}



module.exports = {createOrder , deleteOrder , getAllOrders , getOneOrder , updateOrder , getIncome}