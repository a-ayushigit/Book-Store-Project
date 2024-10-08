const { Server } = require("socket.io");
const http = require("http");
const express = require('express');

const app = express();
const server = http.createServer(app);

const socketMap = {};


const io = new Server(server , {
    cors:{
        origin:'https://book-store-project-frontend.onrender.com',
        
        methods:['GET','POST']
    }
});
// get receiver's socket id
const getUserSocketId = (receiverId) => {
    return socketMap[receiverId];
}

io.on("connection" , (socket)=>{
    console.log(`user ${socket.handshake.query.userId} connected :` , socket.id);
    const userId = socket.handshake.query.userId;
    if(userId !== undefined) socketMap[userId] = socket.id;

    //io.emit used to send events to all connected clients 

    io.emit("getOnlineUsers" , Object.keys(socketMap));

    //used to listen to events but can be used on both client and server side 
    socket.on("disconnect" , ()=>{
        console.log("user disconnected :" , socket.id);
        delete socketMap[userId];
        io.emit("getOnlineUsers" , Object.keys(socketMap));

    })
})



module.exports = {app , io , server , getUserSocketId}; 
