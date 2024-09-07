import React, { useContext, useEffect, useState } from 'react'
import { useLoaderData , useNavigate} from  'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import axios from 'axios';

const GroupMembersPage = () => {

    const { user } = useContext(UserContext);
    const res = useLoaderData();
    const navigate = useNavigate();
    const groupData = res.Groups?res.Groups:null;
    const acceptMember = async (member) => {
        //const groupData = res.Groups;
        try {
          const response = await axios.put(`/groups/${groupData._id}/accept/${member.id}`);
          console.log(response);
          navigate(`/groups/${groupData._id}`);
        } catch (error) {
          console.log(error);
        }
      }
    
  return (
    <div>
        <div className={`flex flex-row justify-between pt-5`}>
          <div>
            <h3>Members of the Group</h3>
            {/* || (groupData.moderators? groupData.moderators.some((moderator) => moderator?.id?.equals(user._id)): null */}
            {groupData.members ? groupData.members.map((member) => 
              (<div key={member._id}>
                Member Name : {member.name || 'No Name'}
               
              </div>)
            ) :
              null}
          </div>
          <div className={`${(user?._id)===(groupData?.createdBy?.id) ? "flex flex-col " : "hidden"}`}>
            
          <h3 className="underline ">Pending Members of the Group</h3>
          <ul>
          {( (groupData.pendingMembers?.length > 0)) ? groupData.pendingMembers?.map((member) => (
              <li key={member.id} className="flex flex-row justify-between items-center">
                <div>{member.name}</div>

                <div className="bg-green-900 text-white p-2 border border-white rounded-md hover:cursor-pointer m-1" onClick={() => acceptMember(member)}>Accept</div>
              </li>


            ))
              :
              null}
          </ul>

          </div>

        </div>
      
    </div>
  )
}

export default GroupMembersPage
