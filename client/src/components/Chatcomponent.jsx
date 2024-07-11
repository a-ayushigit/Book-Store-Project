import React from 'react'
import {useState , useEffect , useContext} from 'react'
import CommunityNavbar from './CommunityNavbar'
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CircleIcon from '@mui/icons-material/Circle';
import {SocketContext} from '../Contexts/SocketContext.jsx';
import MessageSendBar from './MessageSendBar.jsx';

// import  useSocketContext  from "../Contexts/SocketContext.jsx";
const Chatcomponent = () => {
    const [conversations , setConversations] = useState([])
    const [users , setUsers] = useState([]);
    const {onlineUsers} =  useContext(SocketContext);
     async function getSidePanelUsers(){
        try{
        const res = await axios.get('/chats/getUsers')
        
        //console.log(res.data);
        setUsers(res.data);
        
        
        }
        catch(err){
            console.log(err);
        }
        
    } 
    const sendRequest = async (id) =>{
        try{
        const res = await axios.post(`/chats/${id}/sendRequest`);
       console.log(res);
       alert(res.data.message);
        }
        catch(err){
            console.log(err);
        }
        
    }
    const openchat = async (id) => {
        try{
        const res = await axios.get(`/chats/${id}/getMessage`)   
         console.log(res.data);
         setConversations(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        try{
            getSidePanelUsers();
        }
        catch(err){
            console.log(err)
        }
       
    } , [])
    return (
    <div >
        <CommunityNavbar/>
        <div className="grid grid-cols-12 bg-blue-700"> 
        <div className="flex col-span-5 sm:col-span-3 bg-blue-400 flex-col">
        {/* users list displayed  */}
        {users.map((user)=>{
            // console.log(user);
            const isOnline = onlineUsers.includes(user._id);
            console.log(isOnline , user.username);

            return(
                <div key={user._id} className="flex flex-row justify-between p-2 border border-white hover:cursor-pointer text-xs sm:text-sm hover:bg-blue-300" onClick={user.isFriend ? ()=>{openchat(user._id)} : ()=>alert("Not a friend")}>
                <div className="flex flex-row items-center">
                {/* <img src={user.profilePic} alt="" className="h-10 w-10 rounded-full" /> */}
                <PersonIcon  className="h-10 w-10 rounded-full"/>
                <p className="flex flex-row items-center gap-2">{user.username}</p>
                </div>
                <div className="flex flex-row ">
                {user.isFriend && isOnline && (<CircleIcon className="relative flex border rounded-full border-white text-green-700 p-1" fontSize="small" />) }
                </div>
                {user.isFriend ? "" :
                <>
                
                <PersonAddIcon  className="h-10 w-10 rounded-full justify-self-end hover:scale-105 hover:text-white" onClick={()=>sendRequest(user._id)} />
               
                
                </>}
                </div>
            )
        })}
        
      </div>
      <div  className="flex flex-row justify-center  col-span-7 sm:col-span-9 bg-blue-600">
      {/* chat displayed  */}

      <MessageSendBar />
      </div>
        </div>
    
    </div>
  )
}

export default Chatcomponent
