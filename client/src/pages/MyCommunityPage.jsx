import React, { useContext , useEffect , useState } from 'react'
import { UserContext } from '../Contexts/UserContext';
import axios from 'axios';
import Accordion from '../components/Accordion';
// import useUpdateFriendListRt from '../components/hooks/useUpdateFriendListRt';
const MyCommunityPage = () => {
  const { user } = useContext(UserContext);
  // const [pendingFriends , setPendingFriends] = useState([]);
  // const [friends, setFriends] = useState([]);
  // const [requestedFriends, setRequestedFriends] = useState([]);
  // useUpdateFriendListRt();
  let bookshelfData;
  const createBookShelf = async () => {
    try {
      const date = new Date();
      const res = await axios.post(`/bookshelf`, { ownerId: user._id , type:"Users" , name: user.fullname+date});
      console.log(res.data);
    } catch (error) {
     console.log(error);
     alert("Error creating bookshelf:", error); 
    }
    
  }
  const getBookshelf = async() =>{
    try {
    const res = await axios.get(`/bookshelf/${user.bookshelf.id}`, {
      params: {
        ownerId: user._id,
        type: "Users"
      }
    });
    console.log(res.data);
    bookshelfData = res.data;
    } catch (error) {
      console.log("Error getting bookshelf:", error);
    }
    
  }

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
      <div>
        <p className=" flex justify-self-center text-3xl">My Community</p>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-3 bg-red-500 h-full min-h-screen">
Hello
        </div>
        <div className="col-span-6 bg-yellow-500 h-full min-h-screen"> 
        <p>My Bookshelf </p>
         <button onClick={()=>{createBookShelf()}}> Create Your Own Bookshelf</button>
         {user.bookshelf?<>{user.bookshelf.name}</>:<>
         No bookshelf created !!
         </>}
        </div>
        <div className="col-span-3 bg-pink-500 h-full min-h-screen">


<Accordion/>

        </div>
      </div>

    </div>

  )
}

export default MyCommunityPage 
