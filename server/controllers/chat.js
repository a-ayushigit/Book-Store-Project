const express = require('express')
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const User = require('../models/User');
const { getUserSocketId, io } = require('../socket/socket');

const getPublicInfo = async (id) => {
    try {

        const user = await User.findById(id);
    if (!user) return null;
    
    const userPubInfo = { 
        username: user.username, 
        fullname: user.fullname, 
        image: user.avatarImage, 
        _id: user._id,
        email: user.email
    };
    
    // console.log(" public info _id :", typeof userPubInfo._id);
    // console.log(" public info user._id :", typeof user._id);
    // console.log(" public info user._doc :", typeof user._doc);

    return userPubInfo;
        
    } catch (error) {
        console.error("Error in getPublicInfo: ", error.message);
        return null;
    }
    
};

const sendMessage = async (req, res) => {
    try {
        //console.log(req);
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        console.log(receiverId);
        console.log(typeof receiverId);
        //console.log("Hello")
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },

        });
        //console.log("Hello2")
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
            // console.log("Hell03")
        }

        const newMessage = await Message.create({
            senderId, receiverId, message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }



        await Promise.all([conversation.save(), newMessage.save()]);
        // console.log("Hello")
        const receiverSocketId = getUserSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);//sending message to specific client
        }

        res.status(201).json(newMessage);



    }
    catch (err) {
        console.log("Error in message controller :", err.message)
    }
}

const getMessage = async (req, res) => {
    try {
        const { id: chattingUserId } = req.params;
        console.log(req.user);
        const senderId = req.user._id;
        console.log("senderId" , senderId);
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, chattingUserId] },
        }).populate('messages');
        //   console.log("conversation********************************",conversation);
        if (!conversation) return res.status(200).json([]);

        const messages = conversation.messages;
        // console.log("helooooooooooooooo");
        // console.log(messages);
        res.status(200).json(messages);



    }
    catch (err) {
        console.log("Error in get message controller :", err.message)
    }
}

const acceptFriendRequest = async (req, res) => {
    try {
        const { id: userId } = req.params;
        // console.log(req.user);
        //console.log("hello friend!!")
        const receiver = await User.findById(req.user._id);//check if user has the object pendingFriends or not 
        const sender = await User.findById(userId);

        const senderPublicInfo = await getPublicInfo(sender._id);
        //console.log("sender ",senderPublicInfo);
        const receiverPublicInfo = await getPublicInfo(receiver._id);
        //console.log("receiver ",receiverPublicInfo);

        if (receiver.pendingFriends.some((friend)=>
           
            friend._id.equals(userId)
            // console.log(friend._id.equals(userId));
            // console.log("friend id ",friend._id);
            // console.log("received request id ",userId);
        
        
        )
    
        ) {
            //console.log(typeof(receiver.pendingFriends));
            //console.log(typeof(userId));
            const senderIndex = receiver.pendingFriends.findIndex((friend)=>friend._id.equals(userId));
            const receiverIndex = sender.requestSendPeople.findIndex((friend)=>friend._id.equals(receiver._id));
            console.log('sender ind',senderIndex);
            console.log('receiver ind',receiverIndex);
            if (senderIndex > -1) {
                receiver.pendingFriends.splice(senderIndex, 1);
                receiver.friends.push(senderPublicInfo);

                sender.requestSendPeople.splice(receiverIndex, 1);
                sender.friends.push(receiverPublicInfo);
                Promise.all([receiver.save(), sender.save()]);
                

            
            // console.log(receiver._id);
            // console.log(typeof (receiver._id));
            // console.log(typeof JSON.stringify(receiver._id))
            const receiverSocketId = getUserSocketId(receiver._id.toString());
            const senderSocketId = getUserSocketId(sender._id.toString());
            console.log("receiverSocketId: " + receiverSocketId);
            console.log("senderSocketId:" + senderSocketId);
            const receiverPayload = 
                {
                    
                    pendingFriends: receiver.pendingFriends,
                    friends: receiver.friends , 
                    requestSendPeople:receiver.requestSendPeople ,
                   
                };
            const senderPayload =
                {
                    
                    pendingFriends: sender.pendingFriends ,
                    requestSendPeople: sender.requestSendPeople ,
                    friends: sender.friends


                 };
                 
            if (receiverSocketId) {
                console.log("socket friend entered ")
                io.to(receiverSocketId).emit("modifyFriendList",receiverPayload );//sending message to specific client
                console.log("sent the list ")
               
            }
            if (senderSocketId) {
                console.log("socket friend entered ")
                io.to(senderSocketId).emit("modifyFriendList",senderPayload );//sending message to specific client
                console.log("sent the list ")
            }

            return res.status(200).json({ message: "Friend request accepted"});

        }

        }
        else {
            res.status(400).json({ message: "Friend request not found" });
            
        }
    }
    catch (err) {
        console.log("Error in accept friend request  controller :", err.message)
        res.status(500).json(err);
    }

}



// The .findIndex method in JavaScript is used to find the index of the first element in an array that satisfies a provided testing function. It executes the provided function once for each element of the array until it finds one where the function returns a truthy value. If no elements satisfy the testing function, it returns -1.



const rejectFriendRequest = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const receiver = await User.findById(req.user._id);//check if user has the object pendingFriends or not 
        const sender = await User.findById(userId);

        if (receiver.pendingFriends.some((friend)=>friend._id.equals(userId))) {
           
            const senderIndex = receiver.pendingFriends.findIndex((friend)=>friend._id.equals(userId));
            if (senderIndex > -1) {
                receiver.pendingFriends.splice(senderIndex, 1);
               
                receiver.save()
                // return (res.status(200).json({ message: "Friend request rejected" }))
                 
                const receiverSocketId = getUserSocketId(receiver._id.toString());
                const senderSocketId = getUserSocketId(sender._id.toString());
                console.log("receiverSocketId: " + receiverSocketId);

                const receiverPayload = 
                {
                    
                    pendingFriends: receiver.pendingFriends,
                    friends: receiver.friends , 
                    requestSendPeople:receiver.requestSendPeople ,
                   
                };
            const senderPayload =
                {
                    
                    pendingFriends: sender.pendingFriends ,
                    requestSendPeople: sender.requestSendPeople ,
                    friends: sender.friends


                 };

                if (receiverSocketId) {
                    console.log("socket friend entered ")
                    io.to(receiverSocketId).emit("modifyFriendList", receiverPayload);//sending message to specific client
                    console.log("sent the list ")
                }
                if (senderSocketId) {
                    console.log("socket friend entered ")
                    io.to(senderSocketId).emit("modifyFriendList",senderPayload );//sending message to specific client
                    console.log("sent the list ")
                }
    

                return res.status(200).json({ message: "Friend request rejected" });
       

            }

        }
        else {
            res.status(400).json({ message: "Friend request not found" });
        }
    }
    catch (err) {
        console.log("Error in get chat controller :", err.message)
    }

}
const sendFriendRequest = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const receiver = await User.findById(receiverId);
        const senderId = req.user._id;
        const sender = await User.findById(senderId);

        // take out publicInfo of the person from sender 
       
        const senderPublicInfo = await getPublicInfo(sender._id);
        console.log("sender ",senderPublicInfo);
        const receiverPublicInfo = await getPublicInfo(receiver._id);
        console.log("receiver ",receiverPublicInfo);

        // Check if they are already friends
        if (sender.friends.some(friend => friend._id.equals(senderPublicInfo._id))) {
            return res.status(200).json({ message: "You are already friends" });
        }

        // Check if friend request already sent
        else if (sender.requestSendPeople.some(person => person._id.equals(receiverPublicInfo._id)) &&
            receiver.pendingFriends.some(person => person._id.equals(senderPublicInfo._id))) {
            return res.status(200).json({ message: "Friend request already sent" });
        }

        
        // Check if there is a pending friend request from the receiver
        //
        else if (receiver.requestSendPeople.some(person => person._id.equals(senderPublicInfo._id)) &&
            sender.pendingFriends.some(person => person._id.equals(receiverPublicInfo._id))) {
            return res.status(200).json({ message: "You received a friend request from this person already!" });
        }

        // Check if friend request was not accepted and remove it from sender's requestSendPeople
        else if (sender.requestSendPeople.some(person => person._id.equals(receiverPublicInfo._id)) &&
            !receiver.pendingFriends.some(person => person._id.equals(senderPublicInfo._id)) &&
            !receiver.friends.some(friend => friend._id.equals(senderPublicInfo._id))) {
            sender.requestSendPeople = sender.requestSendPeople.filter(person => !person._id.equals(receiverPublicInfo._id));
            await sender.save();
            return res.status(200).json({ message: "Friend request not accepted" });
        }


        // Send friend request
        else{
            sender.requestSendPeople.push(receiverPublicInfo);
            receiver.pendingFriends.push(senderPublicInfo);
            await Promise.all([sender.save(), receiver.save()]);
            return res.status(200).json({ message: "Friend request sent" });

        }
       

    } catch (error) {
        res.status(500).json({ "message": error.message  });
        console.log(error);
    }

        // ```
        // Using the === operator instead of .equals did not work because === checks for strict equality, which means both the value and the type must be the same. In the case of comparing MongoDB ObjectIDs, === compares the object references, not their contents. MongoDB ObjectIDs are objects, and even if two ObjectIDs have the same value, they are different instances, so === will return false.

        //  To compare MongoDB ObjectIDs, the .equals method  provided by the ObjectId class should be used. This method compares the actual values of the ObjectIDs.
        
        // ```

        // ```
        // Avoid using .then.catch in try/catch block to prevent multiple responses being sent , 
        // (need more examples here to understand completely )
        // ```

    

}


const getSidePanelUsers = async (req, res) => {

    try {
        // console.log("get side panel users ",req.user);
        const loggedInUserid = req.user._id;
        // console.log(req.user);
        const loggedInUser = await User.findById(loggedInUserid);
        //console.log(loggedInUser);
        const users = await User.find({ '_id': { $ne: loggedInUserid } , 'isAdmin' : false}).select(
            "username bookshelves groups moderatorGroups avatarImage isAdmin");
        const friendsData = users.map((user) => {
            // if (loggedInUser.friends.includes(user._id)) {
            //     return { ...user._doc, isFriend: true };
            // }
           console.log("admin check ****************" , user);
           
            if(loggedInUser.friends.some((friend)=>(friend._id.equals(user._id)))){

                return { ...user._doc, isFriend: true };
            }
            else {
                return { ...user._doc, isFriend: false };
            }
           

           
       
           

           
         
        })
        //console.log(friendsData);
        res.status(200).json(friendsData);

    }
    catch (err) {
        console.error("Error in getUsersForSidebar: ", err.message);
        res.status(500).json({ "err": "Internal server error" });
    }


}


module.exports = { sendMessage, getMessage, sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getSidePanelUsers };