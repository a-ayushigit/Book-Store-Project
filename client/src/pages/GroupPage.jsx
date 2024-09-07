import React, { useContext, useEffect, useState } from 'react'
import { Link , useLoaderData, useParams } from 'react-router-dom';
import CommunityNavbar from '../components/CommunityNavbar';
import axios from 'axios';
import { UserContext } from '../Contexts/UserContext';
import GroupMembersPage from './GroupMembersPage';
import GroupDiscussionPage from './GroupDiscussionPage';
import CreateDiscussion from './CreateDiscussion';
//importing link after useLoader prevents the useLoader function to work ? why ???
const GroupPage = () => {
  const { subpage } = useParams();
  const { user } = useContext(UserContext);
  const res = useLoaderData();
  const groupData = res.Groups?res.Groups:null;
  console.log("response ",groupData);
  // const [groupData, setGroupData] = useState({});
 
 
 
  console.log("user", user);
  useEffect(() => {
    // console.log(typeof (res.Groups));
    // console.log("data 1",res.Groups[0]);
    // setGroupData(res.Groups);
    // console.log("group data", groupData);
    // console.log("DATA 2 ", groupData);
    // console.log((user._id === groupData.createdBy.id) || (groupData.moderators.some((moderator) => moderator.id.equals(user._id))))
    
  }, [])

 
  return (
    <div className="flex h-full flex-col min-h-screen bg-white text-blue-950 border border-blue-950">
      <div><CommunityNavbar /></div>
      <div className="flex flex-col min-h-screen items-center">
        <h1 className="flex text-4xl m-1 p-3  font-semibold ">{groupData.name}</h1>
        <div>
          <p className="flex flex-row font-bold">Created By&nbsp; <span className="flex underline font-thin">{groupData.createdBy.name}</span></p>
        </div>
        <div className="flex flex-col border p-2 border-b-2 border-t-0 border-r-0 border-l-0 border-b-slate-200">
          <p className="flex flex-row flex-nowrap w-full font-bold">Description :</p>
          <p className="flex justify-self-stretch p-2 font-extralight">{groupData.description}</p>
        </div>
        <div className="flex w-full flex-col border p-2 border-b-2 border-t-0 border-r-0 border-l-0 border-b-slate-200">
          <p className="flex flex-start flex-row font-bold ">Rules :</p>
          <p className="flex justify-self-start p-2 font-extralight">{groupData.rules}</p>
        </div>
        <div>
          <div className="flex  text-green-950 gap-10 font-semibold underline text-xl">
            <p className={`${groupData.isPublic == true ? "hidden" : "border border-blue-950 p-2 rounded-full m-1 hover:bg-blue-300"}`}><Link to={`/groups/${groupData._id}/groupMembers`}>Group Members</Link></p>
            <p className="border border-blue-950 p-2 rounded-full m-1 hover:bg-blue-300"><Link to={`/groups/${groupData._id}/groupDiscussions`}>Group Discussion</Link></p>
            <p className="border border-blue-950 p-2 rounded-full m-1 hover:bg-blue-300"><Link to={`/groups/${groupData._id}/createDiscussion`}>Create Discussion</Link></p>
          </div>
        {subpage === 'groupMembers' && <GroupMembersPage  />} 
        {subpage === 'groupDiscussions' && <GroupDiscussionPage groupId={groupData._id}/>}
        {subpage === 'createDiscussion' && <CreateDiscussion groupId={groupData._id} />} 
        </div>


      </div>



    </div>

  )
}

export default GroupPage
