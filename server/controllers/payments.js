const express = require("express");
const Payment = require('../models/Payment');
const Razorpay = require('razorpay');

const getPayment = async (req , res) =>{
    res.json('Payment Details');
};

const razorpayInstance = new Razorpay ({
    key_id: process.env.KEY_ID_RAZORPAY,
    key_secret: process.env.KEY_SECRET

})

const orderItems = (req , res)=>{
    let {amount} = req.body ;
    try {
        const options = {
            amount : Number(amount)*100,
            currency:"INR",
            receipt:require("crypto").randomBytes(10).toString('hex'),
        }
        razorpayInstance.orders.create(options , (error , order)=>{
            if(error){
                console.log(error)
                res.status(500).json({message:"Something went wrong!"})
            }
            else {
                res.status(200).json({data:order});
                console.log(order);
            }
        })
    }
    catch(error){
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}

const verifySignature = async (req , res)=>{
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    try{
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = require("crypto").createHmac("sha256", ({}).RAZORPAY_SECRET)
        .update(sign.toString())
        .digest("hex");

        const isAuthentic = expectedSign === razorpay_signature;

        if (isAuthentic) {
            const payment = new Payment({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });

        await payment.save();

        res.status(200).json({
            message: "Payement Successfully"
        });


    }
    
}
catch(error){
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);   
}

}

module.exports = {getPayment , orderItems , verifySignature}