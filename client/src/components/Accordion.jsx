import React, { useState , useContext , useEffect } from 'react'
import axios from 'axios';
import { UserContext } from '../Contexts/UserContext';
import useUpdateFriendListRt from './hooks/useUpdateFriendListRt';
//header , content 
const Accordion = () => {
    const [toggle, setToggle] = useState(null);
    const { user } = useContext(UserContext);
    // const [pendingFriends, setPendingFriends] = useState([]);
    // const [friends, setFriends] = useState([]);
    // const [requestedFriends, setRequestedFriends] = useState([]);
    useUpdateFriendListRt();


    // const getUserFriendPublicInfo = (friends) => {
    //     // console.log("Hello!!")
    //     //  console.log(user);
    //     console.log(friends);
    //     if (!friends) return [];
    //     try {

    //         let data = [];
    //         friends.map(async (friendId) => {
    //             const res = await axios.get(`userAdmin/${friendId}`);
    //             console.log(res);
    //             data.push(res.data);
    //         })
    //         return data;
    //     } catch (error) {
    //         console.log(error);
    //         return null;
    //     }
    // }

    const acceptFriendRequest = async (id) => {
        try {
            const res = await axios.put(`/chats/${id}/accept`);
            console.log(res);
            console.log("button clicked!");

        } catch (error) {
            console.log(error);
        }

    }

    const rejectFriendRequest = async (id) => {
        try {
            const res = await axios.put(`/chats/${id}/reject`);
            console.log(res);
            console.log("button clicked!");

        } catch (error) {
            console.log(error);
        }
    }


    // const getUserFriends = async () => {
    //     if (user.pendingFriends.length > 0) {
    //         const pendingFriendsData = await getUserFriendPublicInfo(user.pendingFriends);
    //         setPendingFriends(pendingFriendsData);
    //     }
    //     if (user.requestSendPeople.length > 0) {
    //         const requestedFriendsData = await getUserFriendPublicInfo(user.requestSendPeople);
    //         setRequestedFriends(requestedFriendsData);
    //     }
    //     if (user.friends.length > 0) {
    //         const friendsData = await getUserFriendPublicInfo(user.friends);
    //         setFriends(friendsData);
    //     }
    // };

    // useEffect(() => {
    //     // if((user.bookshelf !== undefined) && (user.bookshelf !== null)){
    //     //   //getBookshelf();



    //     // }
    //     // getUserFriends();

    //     // console.log("pendingFriends", pendingFriends);
    //     // console.log("requestedFriends", requestedFriends);
    //     // console.log("friends", friends);

    // }, [user]);


    const accordionObj = [{
        "id":1,
        "header": "Pending Friend Requests",
        "content": user.pendingFriends,
        "containsButton": true,

    },
    {
        "id":2,
        "header": "Friend Requests Sent",
        "content": user.requestSendPeople
    },
    {
        "id":3,
        "header": "Friends",
        "content": user.friends
    }]

    // console.log("content",data.content);
    return (
        <div>
            {accordionObj.map((data , i) => (
                <div key={i}>
                    <div className="flex flex-row justify-between">
                        <div>{data.header}</div>
                        <div className="hover:cursor-pointer" onClick={() => toggle !== data.id? setToggle(data.id) :setToggle(null) }>{toggle === data.id ? '-' : '+'}</div>
                    </div>
                    <div >
                        {toggle === data.id? data.content?.map((item, i) =>
                        (
                            <div key={i} className="flex flex-row justify-between">
                                <div className="flex flex-row">
                                    <span>{item.image ? (
                                        <img src={item.image} />
                                    ) : null}</span>
                                    <span>{item.username}</span>

                                </div>
                                <div>{data.containsButton && <button className="hover:cursor-pointer" onClick={() => acceptFriendRequest(item._id)}>Accept</button>}</div>
                                <div>{data.containsButton && <button className="hover:cursor-pointer" onClick={() => rejectFriendRequest(item._id)}>Reject</button>}</div>
                            </div>
                        )
                            // console.log(item)
                        ) :
                            null
                        }
                    </div>
                </div>
            ))

            }



        </div>
    )
}

export default Accordion
