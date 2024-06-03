import React from 'react'

const ProfilePage = ({
    handleLogout , user , setUser 
}) => {
  return (
    <div>
      <div className="">
              Logged in as {user.username} ({user.email})
              </div>
              <div className='flex items-center justify-center my-5'>
                <button onClick={handleLogout} className="py-3 rounded-full bg-blue-500 px-6 text-white dark:bg-red-800 font-bold">Logout</button>
              </div>
    </div>
  )
}

export default ProfilePage
