import React, { useContext, useState } from 'react'
import { UserContext } from '../Contexts/UserContext'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProfilePage from './ProfilePage';
import OrderPage  from './OrderPage';




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
        classes += ' bg-gray-300 rounded-full';
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
      const response =   await axios.get(`http://localhost:5000/api/v1/orders/${user._id}`);
      setOrders(response);
    } catch (error) {
      console.log(error);
    }
   
  }

  return (
  <>
    <div className="mx-3">
        <nav className="flex gap-3 items-center justify-center p-5 max-w-auto">
          <Link className={linkClasses("myprofile")} to="/account/myprofile">My Profile</Link>
          <Link onClick={handleOrders} className={linkClasses("myorders")} to="/account/myorders">My Orders</Link>
          {/* <Link className={linkClasses("mycart")} to="/account/mycart">My Cart</Link> */}
          
        </nav>

        {subpage === "myprofile" && <ProfilePage handleLogout={handleLogout} user={user} setUser={setUser} />}
        {subpage === "myorders" && <OrderPage  user={user} setUser={setUser} orders={orders} />}
      </div>
    </>
  )
}

export default AccountPage
