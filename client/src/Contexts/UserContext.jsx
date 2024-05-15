import axios from "axios";
import {createContext , useEffect , useState } from "react";
import {useNavigate } from 'react-router-dom';

//export the context you have created 

export const UserContext = createContext();

//create the function which will provide the context or the required data 
export default  function UserContextProvider({children}){
    const [user , setUser] = useState(null);
    const [ready , setReady] = useState(false);
    useEffect(()=>{
        
        if(!user){
            console.log('Hello')
    axios.get('auth/profile').then(({data})=>{
        console.log(data);
        setUser(data);
        console.log(data);
        setReady(true);
    }).catch(err=>{
        console.log(err);
    });
        }

    // async function fetchData(ev){
    //     ev.preventDefault();
    //     try{
    //     const {data} = await axios.get('http://localhost:5000/api/v1/auth/profile');
    //     setUser(data);
    //      }
    //      catch(err){
    //         console.log(err);
    //      }
        
    // }
    // if(!user){
    //     fetchData();
    // }

    },[])

    return 
    (<UserContext.Provider value={{user , setUser , ready}}>
        {children}
    </UserContext.Provider>
    )


}
