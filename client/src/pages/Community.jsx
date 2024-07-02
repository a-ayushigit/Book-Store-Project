import React from 'react'
import CommunityNavbar from '../components/CommunityNavbar'
import Modal from '../components/Modal';
import { useState , useContext  } from 'react';
import axios from 'axios';
import { UserContext } from '../Contexts/UserContext'
import {  useNavigate } from 'react-router-dom'



const Community = () => {
  const [modal , setModal] = useState(false);
  const {user , setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const optionsList = [
    {
      id:1 , 
      name:"Group Name",
      type: <input type="text" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-5 col-span-6" />
    } , 
    {
      id:2 ,
      name:"Description",
      type:<textarea className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-5 col-span-6"/>
    },
    {
      id:3 , 
      name:"Rules",
      type:<textarea className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-5 col-span-6"/>
    }, 
    {
      id:4 , 
      name:"Group / BookClub Topic",
      type:<input type="text" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-5 col-span-6" />
    },
    {
      id:5 ,
      name:"Public",
      type:<input name="privacy" type="radio" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-5 col-span-3" />
    } , 
    {
      id:6 , 
      name:"Private",
      type:<input name="privacy" type="radio" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-5 col-span-3" />
    }
  ]
  const handleGroup = async () => {
    setModal(true);
  }

  const handleSubmission = async (ev) =>{
    ev.preventDefault();
    try{
      console.log(typeof(Number(user._id)));
        await axios.post('/groups/createGroup', 
          {
            name: ev.target[0].value,
            description: ev.target[1].value,
            rules: ev.target[2].value,
            category: ev.target[3].value,
            // privacy: ev.target[4].checked? "public" : "private",
            createdBy: user._id,
            members: [user._id],
            pendingMembers: [],
            moderators: [user._id],
            isPublic: ev.target[4].checked,
            isPrivate: ev.target[5].checked


          }
          
        )
        alert('Group created successfully !');
          navigate('/groups');
    }
    catch(err){
      console.log(err);
      alert(`${err.message} - Error creating group`);
    }



  }

  return (
    <div className="">
      <div><CommunityNavbar/></div>
      <div className="flex m-3">
        <button className="flex p-3 rounded-xl bg-cyan-500 text-white " onClick={handleGroup}>Add a Group</button>
      </div>
     <div className="flex  m-2 p-3">
     <Modal className="flex " modal={modal}   setModal={setModal} optionsList={optionsList} handleSubmission={handleSubmission} type="group"/>
      </div> 
    </div>
  )
}

export default Community
