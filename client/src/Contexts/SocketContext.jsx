import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import io from "socket.io-client";
export const SocketContext = createContext();

// export const useSocketContext = () => {
//     return useContext(SocketContext);
// }

export const SocketContextProvider = ({children}) => {
    const [socket , setSocket] = useState(null);
    const [onlineUsers , setOnlineUsers] = useState([]);
    const {user} = useContext(UserContext);
    console.log("Hello socket");
    useEffect(()=>{
        if(user){
            const socket = io.connect("http://localhost:5000" , {
                query: { userId : user._id}
            });
            console.log("User connected !");
            setSocket(socket);

            // get all the online users 

            socket.on("getOnlineUsers" , (users) => {
                setOnlineUsers(users);
            })

            return ()=> socket.close();
        }
        else{
            if(socket){
                socket.close();
                setSocket(null);

            }
        }
    },[user])

return <SocketContext.Provider value={{socket , onlineUsers}}>
    {children}
</SocketContext.Provider>
}

