import React, { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  if(!user){
    return (
     navigate('/login')
    )
  }
  return (

    
    <div>
      This is account page for {user.username}
      <div>
        
      </div>
    </div>
  )
}

export default AccountPage
