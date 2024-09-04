import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';
import CommunityNavbar from './CommunityNavbar'
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CircleIcon from '@mui/icons-material/Circle';
import { SocketContext } from '../Contexts/SocketContext.jsx';

import MessageSendBar from './MessageSendBar.jsx';
import { useChatContext } from '../Contexts/ChatContext.jsx';
import useListenRtMessage from './hooks/useListenRtMessage.jsx';
import useConversations from '../zustand/useConversations.jsx';
// import  useSocketContext  from "../Contexts/SocketContext.jsx";




const Chatcomponent = () => {
    const { socket } = useContext(SocketContext);
  
    const [users, setUsers] = useState([]);
    const { onlineUsers } = useContext(SocketContext);
   
    const { selectedConversation, setSelectedConversation, messages, setMessages } = useConversations();
    useListenRtMessage();
    console.log("messages" , messages);
    
    async function getSidePanelUsers() {
        try {
            const res = await axios.get('/chats/getUsers')

            console.log(res.data);
            setUsers(res.data);


        }
        catch (err) {
            console.log(err);
        }

    }
    const sendRequest = async (id) => {
        try {
            const res = await axios.post(`/chats/${id}/sendRequest`);
            console.log(res);
            alert(res.data.message);
        }
        catch (err) {
            console.log(err);
        }

    }
    const openchat = async (id) => {
        console.log("openchat");
        console.log(messages);
        try {
            console.log(id);
            const res = await axios.get(`/chats/${id}/getMessage`);
           
            console.log("Response data",res.data);
           // setConversations(res.data);
           setMessages(res.data);
           setSelectedConversation(id);
           console.log("Completed");

        }
        catch (err) {
            console.log("Error in open chat");
            console.log(err);
        }
    }
    useEffect(() => {
        try {
            getSidePanelUsers();
            console.log(users[0]);


        }
        catch (err) {
            console.log(err)
        }


    }, [])
    return (
        <div className="h-screen" >
            <CommunityNavbar />
            <div className="grid grid-cols-12 bg-blue-600 h-[100vh] max-h-[100vh] no-scrollbar  overflow-y-scroll">
                <div className="flex col-span-5 sm:col-span-3 bg-blue-400 flex-col no-scrollbar   max-h-[100vh] overflow-y-scroll">
                    {/* users list displayed  */}
                    {users.map((user) => {
                        console.log(user);
                        
                        const isOnline = onlineUsers.includes(user._id);
                        // console.log(isOnline , user.username);

                        return (
                            <div key={user._id} className={`flex flex-row justify-between p-2 border border-white hover:cursor-pointer text-xs sm:text-sm ${selectedConversation === user._id ? "bg-blue-800 text-white" : "hover:bg-blue-300"}`} onClick={user.isFriend ? () => { openchat(user._id) } : () => alert("Not a friend")}>
                                <div className="flex flex-row items-center">
                                    {/* <img src={user.profilePic} alt="" className="h-10 w-10 rounded-full" /> */}
                                    <PersonIcon className="h-10 w-10 rounded-full" />
                                    <p className="flex flex-row items-center gap-2">{user.username}</p>
                                </div>
                                <div className="flex flex-row ">
                                    {user.isFriend && isOnline && (<CircleIcon className="relative flex border rounded-full border-white text-green-700 p-1" fontSize="small" />)}
                                </div>
                                {user.isFriend ? "" :
                                    <>

                                        <PersonAddIcon className="h-10 w-10 rounded-full justify-self-end hover:scale-105 hover:text-white" onClick={() => sendRequest(user._id)} />


                                    </>}
                            </div>
                        )
                    })}

                </div>
                <div className="flex flex-col  max-h-[90vh] overflow-y-scroll no-scrollbar col-span-7 sm:col-span-9 bg-blue-600 justify-between">
                    {/* chat displayed  */}
                    {(selectedConversation !== '' || selectedConversation !== null) ?
                        <div className="flex flex-col m-2 ">
                            {messages?messages.map((message, i) => (
                                <div key={i} className={`flex flex-row m-2 p-2 rounded-2xl border border-white bg-yellow-100 w-[20vw] ${(message.senderId === selectedConversation) ?
                                        "self-start" :
                                        "self-end"
                                    } hover:cursor-pointer hover:bg-blue-300 break-all`}>
                                    <p> {message.message} </p>
                                </div>
                            )):
                            <div>Start conversation </div>
                            }
                        </div> : <></>}
                    <div className="flex w-full bottom-0 sticky backdrop-blur-lg">
                        <MessageSendBar />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Chatcomponent
