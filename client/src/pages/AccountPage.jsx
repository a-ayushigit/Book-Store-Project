import React, { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const AccountPage = () => {
  const {user , setUser} = useContext(UserContext);
  const {subpage} = useParams();
  const navigate = useNavigate();
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

  return (
  <>
    <div className="mx-3">
        <nav className="flex gap-3 items-center justify-center p-5 max-w-auto">
          <Link className={linkClasses("myprofile")} to="/account/myprofile">My Profile</Link>
          <Link className={linkClasses("myorders")} to="/account/myorders">My Orders</Link>
          <Link className={linkClasses("mycart")} to="/account/mycart">My Cart</Link>
          
        </nav>

        {subpage === "myprofile" && (
          <div>
            <div className="">
              Logged in as {user.username} ({user.email})
              </div>
              <div className='flex items-center justify-center my-5'>
                <button onClick={handleLogout} className="py-3 rounded-full bg-blue-500 px-6 text-white dark:bg-red-800 font-bold">Logout</button>
              </div>
          </div>
        )}
        
      </div>
    </>
  )
}

export default AccountPage
