import React from 'react'
import Logo from "../assets/logo.jpg";
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import DarkMode from './DarkMode';
const Header = () => {

  const Menu = [
    {
      id:1 , name:"Home" , link:"/#",
    }, 
    {
      id:2 , name:"Shop" , link:"/shop",
    }, 
    {
      id:3 , name:<PersonIcon/> , link:"/login"
    }
  ]
  return (
    <div className=" bg-white dark:bg-red-950 duration-200 dark:text-white">
    <div  className="w-full  flex  h-10 shadow justify-between py-1 px-2 gap-1 ">
      <div className="flex font-bold text-2xl sm:text-3xl items-center">

      <a href="#" className="flex ">
        <img src={Logo} alt="" className="h-8" />
        Books
      </a>
      
      </div>
      <div>
        <DarkMode/>
      </div>
      <ul className=" gap-4  items-center hidden sm:flex">
       {
        Menu.map((menu)=>(
          <li  key={menu.id} className="inline-block hover:text-blue-700">
            <div ><a  href={menu.link}>{menu.name}</a></div>
          </li>
        ))
       }
        
       

      </ul>
     </div>
     </div>
  )
}

export default Header