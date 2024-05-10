import React from 'react'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className=" dark:bg-red-300 " >
    <h1 className=" mt-12 text-4xl text-center dark:text-red-950 font-semibold">Log In</h1>
    <form className="max-w-md mx-auto">
     
      <input type="email" placeholder="emilydoe@gmail.com"/>
      <input type="password" placeholder="Password"/>
      <button className="light dark:bg-red-900 hover:shadow-2xl">Log In </button>
    </form>
  <div className="text-center -mt-60 mb-64 text-gray-900 font-bold py-2 text-sm">Don't have an account ? <Link to={'/register'} className="underline text-balance">Register Now</Link></div>
  </div>
  )
}

export default LoginPage
