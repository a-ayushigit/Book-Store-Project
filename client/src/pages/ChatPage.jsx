import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Contexts/UserContext';
import Chatcomponent from '../components/Chatcomponent';


const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  // const user = useContext(UserContext);
  const { loading , user} = useContext(UserContext);
  useEffect(() => {

  }, [])
  return (
    <div className="h-screen" >
      {!loading && user ?
        <div>
          <Chatcomponent />
        </div>
        : "Please login to chat "}
    </div>
  )
}

export default ChatPage
