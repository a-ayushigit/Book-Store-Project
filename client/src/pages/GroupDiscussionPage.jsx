import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useParams } from 'react-router-dom';
const GroupDiscussionPage = ({groupId}) => {
  const [discussionsdata, setDiscussionsdata] = useState([]);
  const getDiscussions = async () => {
    console.log(groupId);
    try {
      const res = await axios.get(`discussions/?groupId=${groupId}`);
      console.log("response from discussion",res.data);
      setDiscussionsdata(res.data);
    } catch (error) {
      console.log(error);
    }
  

  }
  useEffect(()=>{
    getDiscussions();
  },[])
 
  return (
    <ul className="flex flex-col gap-4 m-1">
     {discussionsdata && discussionsdata.map((item)=>
    <li className="border border-blue-950 shadow-md p-2 rounded-sm">
      <p className="font-semibold text-xl ">{item.topic}</p>
      <p className="font-extralight text-sm italic flex items-center">Created By&nbsp; <span className="font-semibold">{item.createdBy.fullname}</span></p>
      <p className="flex justify-start font-thin">{item.content.substring(0 , 100) + '...'}</p>
      <p className="flex items-center underline"><Link to={`/groups/${groupId}/discussions/${item._id}`}>View Discussion</Link> </p>
    </li>
    )}
    </ul>
  )
}

export default GroupDiscussionPage
