import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
const MessageSendBar = () => {
  const [message , setMessage] = useState("");
  const sendMessage = (m) =>{

  }

  return (
    <div className="flex flex-row self-end  m-2 flex-grow items-center gap-3">
      <input type="text" className="focus:border-none" placeholder="Type in your message" value={message} 
      onChange={(e)=> setMessage(e.target.value)} 
      />
      <button className=" border border-white bg-blue-400 rounded-xl size-10 p-1 items-center hover:cursor-pointer hover:bg-blue-950 hover:scale-105">
      <SendIcon />
      </button>
      
    </div>
  )
}

export default MessageSendBar;
