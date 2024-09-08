import axios from "axios";
import {createContext , useEffect , useState } from "react";
import {useNavigate } from 'react-router-dom';


//export the context you have created 

export const UserContext = createContext({});

//create the function which will provide the context or the required data 
export default  function UserContextProvider({children}){
    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);
//     useEffect(()=>{
//     if(!user){
//             console.log('Hello bolo')
//     axios.get('auth/profile').then(({data})=>{
//        // console.log(data);
//         //setUser({data[username] , data[email]});
//         let userdata = data;
//        // console.log(userdata);
//        // console.log(typeof(userdata));
//         setUser(userdata);
//         //console.log(user);
       
        
        
      
//     }).catch(err=>{
//         console.log(err);
//     }).finally(
//         setLoading(false)
//     );
//         }
// },[user])

useEffect(() => {
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/auth/profile');
            
        } catch (err) {
            console.log(err);
        } finally {
            setUser(data);
            setLoading(false);
        }
    };

    fetchUser();
}, []);

    return (
        
        <UserContext.Provider value={{user , setUser , loading }}>
            {children}
        </UserContext.Provider>
        

    )
    


}
