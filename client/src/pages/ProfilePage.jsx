import React, { useContext, useState } from 'react'
import { UserContext } from '../Contexts/UserContext';
import axios from 'axios';

const ProfilePage = ({
    handleLogout 
}) => {
  const [editAllow , setEditAllow] = useState(false);
  const {user , setUser} = useContext(UserContext);
  const [fullname , setFullname] = useState(user.fullname);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(null);
  const [avatar, setAvatar] = useState(user.avatar);
  //console.log(user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('avatar', avatar);
      formData.append('fullname', fullname);
      formData.append('username', username);
      formData.append('email', email);
      if(password !== null) {formData.append('password', password);}
      const res = await axios.put(`/userAdmin/${user._id}`, formData, { withCredentials: true });
     // setUser(res.data);
      alert('Profile updated successfully');
    } catch (err) {
      console.error(err);
      alert('Error updating profile');
    }
  }
 
  return (
    <div>
      <div className="">
              Logged in as {user.username} ({user.email})
              </div>
              <div className='flex items-center justify-center my-5 gap-2'>
                <button onClick={handleLogout} className="py-3 rounded-full bg-blue-500 px-6 text-white dark:bg-red-800 font-bold">Logout</button>
                <button onClick={()=>setEditAllow(!editAllow)} className="py-3 rounded-full bg-blue-500 px-6 text-white dark:bg-red-800 font-bold">Edit Profile</button>
              </div>

              <div>
                <form enctype="multipart/form-data" onSubmit={handleSubmit} className="p-2 flex flex-col items-start gap-3">
              <label>Full Name</label>
              <input type="text" name="name" disabled={!editAllow}  value={editAllow?fullname:user.fullname}  onChange={(e)=>setFullname(e.target.value)} />
              <label>Username</label>
              <input type="text"  name="username" value={editAllow?username:user.username} disabled={!editAllow} onChange={(e)=>setUsername(e.target.value)}/>
              <label>Email</label>
              <input type="email" name="email" value={editAllow?email:user.email} disabled={!editAllow} onChange={(e)=> setEmail(e.target.value)}/>
              <label>Password</label>
              <input type="password" name="password" value={editAllow?password:null}  disabled={!editAllow} onChange={(e)=>setPassword(e.target.value)}/>
              <label>Upload Avatar Image</label>
              <input type="file" name="avatar" onChange={(e)=> {
                setAvatar(e.target.files[0]);
                console.log(e.target.files[0]);
                console.log("target ",e.target);
                console.log("avatar", avatar);
                }}/>              
              <button className="py-3 rounded-full bg-blue-500 px-6 text-white dark:bg-red-800 font-bold hover:scale-95" type="submit" >Make Changes</button>
                </form>
              </div>
    </div>
  )
}

export default ProfilePage
