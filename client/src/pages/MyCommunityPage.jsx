import React, { useContext , useEffect , useState } from 'react'
import { UserContext } from '../Contexts/UserContext';
import axios from 'axios';
import Accordion from '../components/Accordion';
import BookshelfComponent from '../components/BookshelfComponent';
// import useUpdateFriendListRt from '../components/hooks/useUpdateFriendListRt';
const MyCommunityPage = () => {
  const { user } = useContext(UserContext);
  
  useEffect(()=>{
  console.log(user);
  },[])
  // const [pendingFriends , setPendingFriends] = useState([]);
  // const [friends, setFriends] = useState([]);
  // const [requestedFriends, setRequestedFriends] = useState([]);
  // useUpdateFriendListRt();


//   const getUserFriendPublicInfo =  (friends) =>{
//     // console.log("Hello!!")
//     //  console.log(user);
//     console.log(friends);
//     if(!friends) return [];
//     try {

//       let data = [];
//       friends.map(async(friendId)=>{
//         const res = await axios.get(`userAdmin/${friendId}`);
//         console.log(res);
//         data.push(res.data);
//       })
//       return data;
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
// }

// const getUserFriendPublicInfo = async (friends) => {
//   if (!friends) return [];
//   try {
//     const data = await Promise.all(friends.map(async (friendId) => {
//       const res = await axios.get(`/userAdmin/${friendId}`);
//       return res.data;
//     }));
//     return data;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }


// const acceptFriendRequest = async(id) =>{
//     try {
//       const res = await axios.put(`/chats/${id}/accept`);
//       console.log(res);
//       console.log("button clicked!");
      
//     } catch (error) {
//       console.log(error);
//     }
    
// }

//  const  getUserFriends =  () =>{
//   console.log(user);
//   if(user.pendingFriends.length > 0){
//    console.log("anoushka!!")
//     setPendingFriends(getUserFriendPublicInfo(user.pendingFriends));
    
//   }
    
//   if(user.requestSendPeople.length > 0)
//      setRequestedFriends(getUserFriendPublicInfo(user.requestSendPeople));
//   if(user.friends.length > 0)
//      setFriends(getUserFriendPublicInfo(user.friends));
  

//  }

// const getUserFriends = async () => {
//   if (user.pendingFriends.length > 0) {
//     const pendingFriendsData = await getUserFriendPublicInfo(user.pendingFriends);
//     setPendingFriends(pendingFriendsData);
//   }
//   if (user.requestSendPeople.length > 0) {
//     const requestedFriendsData = await getUserFriendPublicInfo(user.requestSendPeople);
//     setRequestedFriends(requestedFriendsData);
//   }
//   if (user.friends.length > 0) {
//     const friendsData = await getUserFriendPublicInfo(user.friends);
//     setFriends(friendsData);
//   }
// };

 

  // useEffect(()=>{
  //   // if((user.bookshelf !== undefined) && (user.bookshelf !== null)){
  //   //   //getBookshelf();
      


  //   // }
  //   getUserFriends();
    
  //     console.log("pendingFriends", pendingFriends);
  //     console.log("requestedFriends", requestedFriends);
  //     console.log("friends", friends);

  // },[user, user.pendingFriends, user.friends]);
 
  return (
    <div className="h-full flex-col items-center justify-center">
     
      <div className="grid grid-cols-12">
        
       <div className="col-span-8">
       <BookshelfComponent/>
       </div>
       
        <div className="col-span-4 h-full min-h-screen">


<Accordion/>

        </div>
      </div>

    </div>

  )
}

export default MyCommunityPage 
