import React, { useState , useContext} from 'react'
import SendIcon from '@mui/icons-material/Send';
import { UserContext } from '../Contexts/UserContext';
import axios from 'axios';
import { useChatContext } from '../Contexts/ChatContext';
import useConversations from '../zustand/useConversations';

const MessageSendBar = () => {
  const { selectedConversation} = useConversations();
  //console.log(selectedConversation);
  const [message , setMessage] = useState([]);
  const user = useContext(UserContext);
  const {messages , setMessages } = useConversations();
  const sendMessage = async(m) =>{
    try {
      console.log(m);
      const res =  await axios.post(`/chats/${selectedConversation}/sendMessage`,{
        'message':m
      })
      
      console.log("Message sent successfully !")
      console.log("res*********************************",res);
      setMessages([...messages , 
        {
          'message':res.data.message,
          'senderId':res.data.senderId,
          'receiverId':res.data.receiverId,

        }]);
      setMessage("");
      console.log("sent message" , messages);
      
    } catch (error) {
      console.log(error)
    }
   
     
  }

  return (
    <div className="flex flex-row self-end  m-2 flex-grow items-center gap-3 ">
      <input type="text" className="focus:border-none" placeholder="Type in your message" value={message} 
      onChange={(e)=> setMessage(e.target.value)} 
      />
      <button className=" border border-white dark:bg-red-500 bg-blue-400 rounded-xl size-10 p-1 items-center hover:cursor-pointer hover:bg-blue-950 hover:scale-105" onClick={()=>sendMessage(message)}>
      <SendIcon />
      </button>
      
    </div>
  )
}

export default MessageSendBar;
