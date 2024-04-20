import React, { useEffect, useState } from 'react'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const DarkMode = () => {
    const [theme,setTheme] = useState(localStorage.getItem("theme") || "light");
    useEffect(()=>{
        if(theme === "dark"){
            document.documentElement.classList.add("dark");
            localStorage.setItem(theme , "dark");
       }
       else{
        document.documentElement.classList.remove("dark");
        localStorage.setItem(theme , "light");
       }
    },[theme]);

  return (
    <div className="flex">
    <div className="relative flex  justify-center my-0">
        <button className=" flex w-16 h-8 border-4  border-gray-100 rounded-full px-3 ">
        <WbSunnyIcon className={`w-8 h-6 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all hover:drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]  duration-300 absolute right-0 z-10 ${theme === "dark" ? "opacity-0" : "opacity-100"} `} 
        onClick={() => {setTheme(theme === "dark" ? "light":"dark")}}
        />
        <DarkModeIcon className={`w-8 h-6 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all hover:drop-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]  duration-300 absolute z-10 ${theme === "light" ? "opacity-0" : "opacity-100"}`} 
        onClick={() => {setTheme(theme === "dark" ? "light":"dark")}}/>
        </button>
        
      
    </div>

    </div>
  )
}

export default DarkMode
