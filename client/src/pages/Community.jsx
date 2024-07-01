import React from 'react'
import CommunityNavbar from '../components/CommunityNavbar'
import Modal from '../components/Modal';
import { useState } from 'react';
const Community = () => {
  const [modal , setModal] = useState(false);
  const optionsList = [
    {
      id:1 , 
      name:"Group Name",
      type:"text"
    } , 
    {
      id:2 ,
      name:"Description",
      type:"textarea"
    },
    {
      id:3 , 
      name:"Rules",
      type:"textarea"
    }, 
    {
      id:4 , 
      name:"Group / BookClub Topic",
      type:"text"
    },
    {
      id:5 ,
      name:"Public",
      type:"radio"
    } , 
    {
      id:6 , 
      name:"Private",
      type:"radio"
    }
  ]
  const handleGroup = async () => {
    setModal(true);
  }

  return (
    <div className="">
      <div><CommunityNavbar/></div>
      <div class="flex m-3">
        <button className="flex p-3 rounded-xl bg-cyan-500 text-white " onClick={handleGroup}>Add a Group</button>
      </div>
      <Modal className="flex " modal={modal}  setModal={setModal} optionsList={optionsList} type="group"/>
    </div>
  )
}

export default Community
