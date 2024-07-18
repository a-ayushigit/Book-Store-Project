import React, { useState , useContext} from 'react'
import SendIcon from '@mui/icons-material/Send';
import { UserContext } from '../Contexts/UserContext';
import axios from 'axios';
import { useChatContextProvider } from '../Contexts/ChatContext';

const MessageSendBar = () => {
  const {messages , setMessages , selectedConversation} = useChatContextProvider();
  const user = useContext(UserContext);
  const sendMessage = async(m) =>{
    try {
      console.log(m);
      const res =  await axios.post(`/chats/${selectedConversation}/sendMessage`,{
        'message':m
      })
      console.log("Message sent successfully !")
      console.log(res);
      setMessages("");
    } catch (error) {
      console.log(error)
    }
   
     
  }

  return (
    <div className="flex flex-row self-end  m-2 flex-grow items-center gap-3">
      <input type="text" className="focus:border-none" placeholder="Type in your message" value={messages} 
      onChange={(e)=> setMessages(e.target.value)} 
      />
      <button className=" border border-white bg-blue-400 rounded-xl size-10 p-1 items-center hover:cursor-pointer hover:bg-blue-950 hover:scale-105" onClick={()=>sendMessage(messages)}>
      <SendIcon />
      </button>
      
    </div>
  )
}

export default MessageSendBar;
