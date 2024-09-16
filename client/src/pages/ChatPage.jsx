import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Contexts/UserContext';
import Chatcomponent from '../components/Chatcomponent';


const ChatPage = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  // const user = useContext(UserContext);
  const { loading , user} = useContext(UserContext);
  useEffect(() => {
    console.log(user);
  }, [])
  if(loading) return <>Loading......</>
  if(!loading && user)
  return (
    <div className="h-screen" >
     
        <div>
          <Chatcomponent />
        </div>
       
    </div>
  )
  if(!loading && !user) return <>"Please login to chat "</>
}

export default ChatPage
