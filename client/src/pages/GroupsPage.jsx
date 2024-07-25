import React, { useState } from 'react'
import {useEffect , useContext} from 'react'
import axios from 'axios'
import { UserContext } from '../Contexts/UserContext';
import CommunityNavbar from '../components/CommunityNavbar'
import { Link } from 'react-router-dom';

const GroupsPage = () => {
 const [groups , setGroups] = useState([]);
 const {user , setUser} = useContext(UserContext);
 const getGroups = async()=>{
  try{
  const res = await axios.get('/groups');
  console.log(res.data);
  setGroups(res.data);
  }
  catch(err){
    console.log(err);

  }

}
const sendRequest = async(groupId)=>{
  try{
  console.log(groupId);
  const res = await axios.post(`/groups/${groupId}/request/${user._id}`);
  console.log(res.data);
  alert("Request sent successFully !!");
  }
  catch(err){
    console.log(err)
  }
 
}

  useEffect(()=>{
    getGroups()
  }, [])
  return (
    <div className="h-full min-h-screen">
      <div><CommunityNavbar/></div>
      <h1 className="flex font-bold text-4xl font-serif justify-center">GROUPS</h1>
      <div className="grid grid-cols-12 gap-4 p-3">
      {groups.map((group,i)=>(
       <div key={i} className="flex flex-row sm:col-span-6 col-span-12 hover:cursor-pointer">
        <div className="flex flex-col h-full w-full  bg-indigo-200 p-4 border-blue-500 border shadow-sm shadow-pink-800 ">
        <h1 className="text-xl font-bold ">{group.name}</h1>
         <p>{group.description.substr(0,100)+'...'}</p>
         <div className="flex flex-row gap-5 p-1 justify-between items-center ">
          <button onClick={()=>{sendRequest(group._id)}} className={`${user._id === group.createdBy.id || group.members.includes(user._id) || group.moderators.includes(user._id)? "hidden":"flex items-center justify-center m-1 bg-blue-500 text-white font-light rounded-xl p-1"}`}> Request to Join </button>
          <Link to ={`/groups/${group._id}`} className='flex underline font-semibold '> View Group  </Link>
          </div>
        </div>
      </div>
     ))}
      
      </div>
   
    </div>
  )
}

export default GroupsPage
