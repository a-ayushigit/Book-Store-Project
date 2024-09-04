import React, { useEffect } from 'react'
import {SocketContext} from '../../Contexts/SocketContext.jsx';
import { useContext } from 'react';
import axios from 'axios';
import useConversations from '../../zustand/useConversations.jsx';
const useListenRtMessage = () => {

  const { socket } = useContext(SocketContext);
  const { messages , setMessages , selectedConversation } = useConversations();

  useEffect(()=>{
    const getprevMessages = async()=>{
      const res = await axios.get(`/chats/${selectedConversation}/getMessage`);
      console.log(res);
    }
    console.log("Hello I am here !!");
    getprevMessages();
    socket?.on("newMessage" , (newMessage) =>{
      setMessages([...messages, newMessage]);
      console.log("message received from socket");
    })
    console.log(messages);
    return ()=> socket?.off("newMessage");

  }, [setMessages , messages , socket]);
  
}

export default useListenRtMessage
