import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { UserContext } from '../Contexts/UserContext';
const LoginPage = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser, loading, setLoading } = useContext(UserContext);



  async function loginUser(ev) {
    ev.preventDefault();

    try {
      const { data } = await axios.post('auth/login', { email, password }, { withCredentials: true });
      
      alert('Login successful');
      setUser(data);
      
      navigate('/');



    } catch (error) {
      console.log(error);
      alert('Login failed !');
    } 
  }

  return (
    <div className=" dark:bg-red-300 " >
      <h1 className=" mt-12 text-4xl text-center dark:text-red-950 font-semibold">Log In</h1>
      <form className="max-w-md mx-auto" onSubmit={loginUser}>

        <input type="email" placeholder="emilydoe@gmail.com" value={email} onChange={ev => setEmail(ev.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={ev => setPassword(ev.target.value)} />
        <button className="light dark:bg-red-900 hover:shadow-2xl">Log In </button>
      </form>
      <div className="text-center -mt-60 mb-64 text-gray-900 font-bold py-2 text-sm">Don't have an account ? <Link to={'/register'} className="underline text-balance">Register Now</Link></div>
    </div>
  )
}

export default LoginPage
