import React, { useContext, useEffect, useState } from 'react'
import { useLoaderData} from  'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import axios from 'axios';

const GroupMembersPage = () => {

    const { user } = useContext(UserContext);
    const res = useLoaderData();
    const groupData = res.Groups?res.Groups:null;
    const acceptMember = async (member) => {
        //const groupData = res.Groups;
        try {
          const response = await axios.put(`/groups/${groupData._id}/accept/${member.id}`);
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    
  return (
    <div>
        <div className={`${(groupData?.isPrivate) ?  "hidden": "flex visible"} flex flex-col `}>
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
          <div>
            <h3>Pending Members of the Group</h3>
            
            {(((user?._id)===(groupData?.createdBy?.id)) && !(groupData.pendingMembers?.length > 0)) ? groupData.pendingMembers?.map((member) => (
              <div key={member.id} className="flex flex-row">
                <div>{member.name}</div>

                <div onClick={() => acceptMember(member)}>Accept</div>
              </div>


            ))
              :
              null}
          </div>

        </div>
      
    </div>
  )
}

export default GroupMembersPage
