import React, { useContext, useState } from 'react'
import { UserContext } from '../Contexts/UserContext'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProfilePage from './ProfilePage';
import OrderPage  from './OrderPage';
import MyCommunityPage from './MyCommunityPage';
import ProfileLoader from './ProfileLoader';


const AccountPage = () => {
  const {user , setUser} = useContext(UserContext);
  const {subpage} = useParams();
  const navigate = useNavigate();
 
  const [orders,setOrders] = useState({});

  console.log(location);
  if(!user){
    return (
     navigate('/login')
    )
  }

  
  console.log(subpage);

  function linkClasses(type=null){
      let classes = 'py-2 px-6 inline-flex gap-1';
      if(type === subpage){
        classes += ' dark:bg-red-800 bg-blue-500 text-white rounded-full';
      }
      else{
        classes += ' bg-cyan-100 dark:bg-red-950 rounded-full';
      }
      console.log(classes);
      return classes ;
  }

  async function handleLogout(){
    await axios.post('auth/logout');
    setUser(null);
    console.log("check logout")
    console.log(user);
    navigate('/');
  }

  async function handleOrders(){
    //console.log("$$$$$$$$")
    try {
      console.log(user._id)
      const response =   await axios.get(`/orders/${user._id}`);
      setOrders(response);
    } catch (error) {
      console.log(error);
    }
   
  }

  return (
  <>
    <div className="min-h-screen px-3 bg-blue-200 dark:bg-yellow-800 dark:text-white text-blue-950">
        <nav className="flex gap-3 items-center justify-center p-5 max-w-auto">
          <Link className={linkClasses("myprofile")} to="/account/myprofile">My Profile</Link>
          <Link onClick={handleOrders} className={linkClasses("myorders")} to="/account/myorders">My Orders</Link>
          <Link className={linkClasses("mycommunity")} to="/account/mycommunity">My Community</Link>
          
        </nav>
         {subpage === null && <ProfileLoader/>}
        {subpage === "myprofile" && <ProfilePage handleLogout={handleLogout}  />}
        {subpage === "myorders" && <OrderPage  user={user} setUser={setUser} orders={orders} />}
        { subpage === "mycommunity" && <MyCommunityPage/>}
      </div>
    </>
  )
}

export default AccountPage
