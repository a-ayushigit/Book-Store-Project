const express = require('express')
const Message = require('../models/Message');
const  Conversation  = require('../models/Conversation');
const User = require('../models/User');

const sendMessage = async (req , res) =>{
    try{
    const {message} = req.body ;
    const {id:receiverId} = req.params ;
    const {senderId} = req.body ;
    console.log("Hello")
    let conversation = await Conversation.findOne({
        participants:{ $all : [senderId , receiverId]},

    });
    console.log("Hello2")
    if(!conversation){
        conversation = await Conversation.create({
            participants :[senderId , receiverId],
        })
        console.log("Hell03")
    }

    const newMessage = await Message.create({
        senderId , receiverId , message
    });

    if(newMessage){
        conversation.messages.push(newMessage._id);
    }
    
    await Promise.all([conversation.save() , newMessage.save()]);
    console.log("Hello")
    res.status(201).json(newMessage);
    }
    catch(err){
        console.log("Error in message controller :", err.message)
    }
}

const getMessage = async (req , res) =>{
try{
    const {id:chattingUserId} = req.params;
    const senderId = req.user.id;

    const conversation = await Conversation.findOne({
        participants:{ $all :[senderId , chattingUserId] }, 
    }).populate('messages');

    if(!conversation) return res.status(200).json([]);

    const messages = conversation.messages;
    res.status(200).json(messages);



}
catch(err){
    console.log("Error in get message controller :", err.message)
}
}

const acceptFriendRequest = (req , res) =>{
    try{
    const {id:userId} = req.params;
    const receiver = req.user;
    const sender = User.findById(userId);
    if (receiver.pendingFriends.includes(userId)){
        const userIndex = group.pendingFriends.indexOf(userId);
        const receiverIndex = sender.pendingFriends.indexOf(receiver._id);
        if (userIndex > -1){
            receiver.pendingFriends.splice(userIndex, 1);
            receiver.friends.push(userId);

            sender.pendingFriends.splice(userIndex, 1);
            sender.friends.push(receiver._id);
            Promise.all([receiver.save() , sender.save()]).then(res.status(200).json({message : "Friend request accepted"})).catch((err)=>{
                console.log(err);
            })

           
        }

    }
    else{
        res.status(400).json({message : "Friend request not found"});
    }
    }
    catch(err){
        console.log("Error in get chat controller :", err.message) 
    }
    
}
const rejectFriendRequest = (req , res) =>{
    try{
    const {id:userId} = req.params;
    const receiver = req.user.id;
    if (receiver.pendingFriends.includes(userId)){
        const userIndex = group.pendingFriends.indexOf(userId);
        if (userIndex > -1){
            receiver.pendingFriends.splice(userIndex, 1);
            
            receiver.save().then(res.status(200).json({message : "Friend request rejected"})).catch((err)=>{
                console.log(err);
            })

        }

    }
    else{
        res.status(400).json({message : "Friend request not found"});
    }
    }
    catch(err){
        console.log("Error in get chat controller :", err.message) 
    }
    
}
const sendFriendRequest = async (req , res) =>{

    try {
        const {id:receiverId} = req.params;
        const receiver = await User.findById(receiverId);
        const senderId = req.user.id;
        const sender = await User.findById(senderId);
        if (sender.friends.includes(receiver)){
            res.status(200).json({message : "You are already friends"});
        }
        else if (sender.pendingFriends.includes(receiver._id) && receiver.pendingFriends.includes(sender._id)){
            res.status(200).json({message : "Friend request already sent"});
        }
        else if (sender.pendingFriends.includes(receiver._id) && !receiver.pendingFriends.includes(sender._id) && !receiver.friends.includes(sender._id)){
            sender.pendingFriends.splice(receiver._id, 1);
            await sender.save().then(res.status(200).json({message : "Friend request not accepted"})).catch(err => console.log(err));
            

        }
        else {
            sender.requestSendPeople.push(receiver._id);
            receiver.pendingFriends.push(sender._id);
            await Promise.all([ sender.save() , receiver.save()]).then(res.status(200).json({message : "Friend request sent"})).catch((err)=>{
                console.log(err);
            })
           
        }
        

    } catch (error) {
        res.status(500).json({"message":error.message});
        console.log(error);
    }
   
}


const getSidePanelUsers = async (req , res)=>{
    
    try{
        const loggedInUserid = req.user.id;
        //console.log(req.user);
        const loggedInUser = await User.findById(loggedInUserid);
        //console.log(loggedInUser);
        const users = await User.find({ '_id' :{$ne: loggedInUserid}}).select(
            "username bookshelves groups moderatorGroups profilePic"    );
        const friendsData = users.map((user) =>{
            if (loggedInUser.friends.includes(user._id)){
                return {...user._doc, isFriend : true};
            }
            else {
                return {...user._doc, isFriend : false};
            }
        })
        //console.log(friendsData);
            res.status(200).json(friendsData);

    }
    catch(err){
        console.error("Error in getUsersForSidebar: ", err.message);
        res.status(500).json({ "err": "Internal server error" });
    }
   
    
}


module.exports = {sendMessage , getMessage , sendFriendRequest , acceptFriendRequest , rejectFriendRequest , getSidePanelUsers };