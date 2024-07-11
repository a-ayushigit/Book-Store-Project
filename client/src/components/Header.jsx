import React, { useContext } from 'react'
import Logo from "../assets/logo.jpg";
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import DarkMode from './DarkMode';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { UserContext } from '../Contexts/UserContext';
import VerticalMenu from './VerticalMenu';
import { CartContext } from '../Contexts/CartContext';
import ForumIcon from '@mui/icons-material/Forum';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import HomeIcon from '@mui/icons-material/Home';

const Header = () => {
  const { user } = useContext(UserContext);
  const cart = useContext(CartContext);
  const booksCount = cart.items.reduce((sum , book)=>sum + book.quantity , 0);
  console.log(user);




  const Menu = [
    {
     id: 1, 
     icon: <HomeIcon/>,
     name: "Home", 
     link: "/#",
    },
    {
      id: 2,  
      icon:<LocalMallIcon/>,
      name:"Shop" ,
      link: "/shop",
    },
    {
      id: 3,
      icon: user ? <PersonIcon /> : <LoginIcon />,
      name: user ? <>{' ' + user.username.split(" ")[0]}</> : "Login" , 
      link: user ? "/account" : "/login",
    },
     {
      id:4 , 
      icon:<ForumIcon/>,
      name: "Community" ,
      link:"/community",
     },
    {
      id: 5, 
      icon:<>
      <ShoppingCartIcon  />
      <div className="bg-white rounded-full justify-center items-center py-[0.1rem] -top-2 -left-1 w-5 h-5 text-xs text-center absolute dark:text-red-900 border dark:border-red-900 border-blue-900">
      {booksCount}
      </div>
      </>,
      name: "Cart", 
      link: "/cart",
    }  
  ]

  return (
    <div className="h-10 bg-cyan-200  dark:bg-red-950 duration-200 dark:text-white">
      <div className="w-full  flex  h-10 shadow justify-between py-1 px-2 gap-1 ">
        <div className="flex font-bold text-xs sm:text-3xl items-center justify-between">

          <a href="#" className="flex ">
            <img src={Logo} alt="" className="h-8" />
           <p className="text-xl sm:text-2xl">BookSphere</p> 
          </a>

        </div>
        <div>
          <DarkMode />
        </div>
        <ul className=" gap-4  items-center hidden sm:flex">
         
          {
              Menu.map((menu)=>(
 
               <li key={menu.id} className="inline-block hover:text-blue-700">
                  <div className="font-bold uppercase text-xs rounded-md hover:border hover:border-blue-950 p-1">
                 
                 
                  <a href={menu.link}> 
                  <div className="flex flex-row text-wrap text-xs relative text-center justify-center">
                  {menu.icon}
                  <p className="md:flex flex-row hidden md:text-center justify-center pt-1 pl-1"> {menu.name} </p> 
                  </div>
                  </a>
                  </div>
               </li>

              )

              )
          }



        </ul>
        <VerticalMenu Menu={Menu} />
      </div>

    </div>
  )
}

export default Header
