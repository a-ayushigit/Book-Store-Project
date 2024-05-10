import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
const RegisterPage = () => {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  

  const navigate = useNavigate();

  async function registerUser(ev){
    ev.preventDefault();
    try {
      await axios.post('auth/register',
      {
        username , email , password
      }
    );
    
    alert('Registration Successful . Now you can log in !');
    navigate('/login');
    
    } 
    catch (error) {
      console.log(error);
      alert('Registration failed')
    }
    
    
  }

  return (
    <div className=" dark:bg-red-300 " >
      <h1 className=" mt-12 text-4xl text-center dark:text-red-950 font-semibold">Register</h1>
      <form className="max-w-md mx-auto" onSubmit={registerUser}>
        <input type="text" placeholder="Emily Doe"
        value={username} 
        onChange={ev => setUsername(ev.target.value)}
        />
        <input type="email" placeholder="emilydoe@gmail.com"
        value={email}
        onChange={ev => setEmail(ev.target.value)}
        />
        <input type="password" placeholder="Password"
        value={password}
        onChange={ev => setPassword(ev.target.value)}
        />
        <button className="light dark:bg-red-900 hover:shadow-2xl">Register</button>
      </form>
    <div className="text-center -mt-60 mb-64 text-gray-900 font-bold py-2 text-sm">Already a member ? <Link to={'/login'} className="underline text-balance">LogIn</Link></div>
    </div>
  )
}

export default RegisterPage
