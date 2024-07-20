import React from 'react'
import CommunityNavbar from '../components/CommunityNavbar'
import Modal from '../components/Modal';
import { useState , useContext  } from 'react';
import axios from 'axios';
import { UserContext } from '../Contexts/UserContext'
import {  useNavigate } from 'react-router-dom'
import CommunityForm from '../components/CommunityForm';
import communityImage from '../assets/community_image.png';
import {groupOptionsList} from '../constants/index.jsx';
const Community = () => {
  const [groupForm , setGroupForm] = useState(false);
  const [discussionForm , setDiscussionForm] = useState(false);
  const {user , setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleGroupAndDiscussion = async (item) => {

    if(item === "group") {
      setGroupForm(true);
      setDiscussionForm(false);
    }
    else if (item === "discussion"){
      setGroupForm(false);
      setDiscussionForm(true);
    } 
    else return;
  }

  const handleSubmissionGroup = async (ev) =>{
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

  const handleSubmissionDiscussion = async (ev) =>{
    ev.preventDefault();
    try{
      console.log(typeof(Number(user._id)));
        await axios.post('/discussions/createDiscussion', 
          {
            topic: ev.target[0].value,
            content: ev.target[1].value,
            createdBy: user._id,
            
          }
          
        )
        alert('Discussion created successfully!');
          navigate('/discussions');
    }
    catch(error){
      console.log(err);
      alert(`${err.message} - Error creating discussion`);
    }
  }

  return (
    <div className="flex flex-col no-scrollbar">
      <div><CommunityNavbar/></div>
      <div className="flex m-3 items-center justify-center gap-5 ">
        <button className="flex p-3 rounded-xl bg-cyan-500 text-white " onClick={()=>handleGroupAndDiscussion("group")}>Add a Group</button>
        <button className="flex p-3 rounded-xl bg-cyan-500 text-white " onClick={()=>handleGroupAndDiscussion("discussion")}>Start a Discussion</button>
      </div>
     <div className="flex bg-book-center m-2 p-3">
     {/* <Modal className="flex " modal={modal}   setModal={setModal} optionsList={optionsList} handleSubmission={handleSubmission} type="group"/> */}
     {
      groupForm?
      <CommunityForm handleSubmission={handleSubmissionGroup} group={groupForm} discussionForm={discussionForm} options={groupOptionsList} />:
      discussionForm?
      <CommunityForm handleSubmission={handleSubmissionDiscussion} discussion={discussionForm} group={groupForm} options={groupOptionsList} />:
      <div className="flex  h-[75vh] w-screen ">
        <div className="flex flex-col  gap-5 w-full place-items-center">
               <p className="flex items-start font-serif font-bold text-lg text-cyan-950">Come and Engage with the vibrant community !!!</p>
               <ul className="flex list-disc flex-col items-start font-serif font-bold text-lg text-cyan-950">
                <li>Shared Interests</li>
                <li>Diverse Opinion</li>
                <li>Collective Insights</li>
                <li>Reading Motivation</li>
                <li>.....and lots more </li>

               </ul>
               <p className="flex items-start font-serif font-bold text-lg text-cyan-950">
                Join the community .....
               </p>
                
        </div>
        
        
       
      </div>
          
     }

      </div> 
    </div>
  )
}

export default Community
