import React, { useEffect } from 'react'
import {SocketContext} from '../../Contexts/SocketContext.jsx';
import { useContext } from 'react';

import useConversations from '../../zustand/useConversations.jsx';
const useListenRtMessage = () => {

  const { socket } = useContext(SocketContext);
  const { messages , setMessages } = useConversations();

  useEffect(()=>{
    console.log("Hello I am here !!");
    
    socket?.on("newMessage" , (newMessage) =>{
      setMessages([...messages, newMessage]);
      console.log("message received from socket");
    })
    console.log(messages);
    return ()=> socket?.off("newMessage");

  }, [setMessages , messages , socket]);
  
}

export default useListenRtMessage
