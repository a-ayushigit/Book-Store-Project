import React from 'react'
import LoginToContinue from '/LoginToContinue.jpeg';
const LoginToContinuePage = () => {
  return (
    <div className="flex flex-row h-[100vh] bg-cyan-700 text-white items-center justify-around">
     <div className="font-bold h-[10vh] text-lg flex-col justify-start">
        <p>Please</p>
        <p> login </p>
        <p>to continue....</p></div> 
      <div>
      <img alt="" src={LoginToContinue} className="h-[80vh] w-full rounded-xl"/>
      </div>

    </div>
  )
}

export default LoginToContinuePage
