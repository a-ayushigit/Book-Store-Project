import React , {useEffect} from 'react'
import {SocketContext} from '../../Contexts/SocketContext.jsx';
import { useContext } from 'react';
import {UserContext} from '../../Contexts/UserContext.jsx';
// import useUpdateFriendListRt from '../components/hooks/useUpdateFriendListRt';
const useUpdateFriendListRt = () => {
    const { socket } = useContext(SocketContext);
    const { user , setUser} = useContext(UserContext);

    useEffect(()=>{
        console.log("Hello I am updating!!");
        
        // socket?.on("modifyFriendList" , ({
        //     pendingFriends , friends
        // }) =>{
        //     console.log("hello socket friends");
        //     setUser((prev) => ({
        //         ...prev,
        //         pendingFriends,
        //         friends,
        //       }));
        //       console.log("socket pending", pendingFriends);
        //       console.log("socket friends", friends); 
          
        // })
        const handleModifyFriendList = ({ pendingFriends, friends }) => {
            console.log("hello socket friends");
            setUser((prev) => ({
              ...prev,
              pendingFriends,
              friends,
            }));
            console.log("socket pending", pendingFriends);
            console.log("socket friends", friends);
          };
      
          socket?.on("modifyFriendList", handleModifyFriendList);
        
        console.log(user.pendingFriends);
        console.log(user.friends);
      
        return ()=> socket?.off("modifyFriendList");
    
      }, [ socket , setUser , user.pendingFriends , user.friends , user]);
 
}

export default useUpdateFriendListRt
