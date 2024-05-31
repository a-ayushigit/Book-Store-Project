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

const Header = () => {
  const { user } = useContext(UserContext);
  const cart = useContext(CartContext);
  const booksCount = cart.items.reduce((sum , book)=>sum + book.quantity , 0);
  console.log(user);

  const Menu = [
    {
      id: 1, name: "Home", link: "/#",
    },
    {
      id: 2, name: "Shop", link: "/shop",
    },
    {
      id: 3, name: user ? <><PersonIcon />{' ' + user.username}</> : <><LoginIcon />{" Login "}</>, link: user ? "/account" : "/login",
    },
    {
      id: 4, name:
      <div className="flex flex-row text-wrap text-xs relative ">
      <ShoppingCartIcon  />
      <div className="bg-white rounded-full justify-center items-center py-[0.1rem] -top-2 -left-1 w-5 h-5 text-xs text-center absolute dark:text-red-900 border dark:border-red-900 border-blue-900">
      {booksCount}
      </div>
      {" Cart "}
      </div> , 
      link: "/cart",
    }
  ]
  return (
    <div className="h-10 bg-cyan-200  dark:bg-red-950 duration-200 dark:text-white">
      <div className="w-full  flex  h-10 shadow justify-between py-1 px-2 gap-1 ">
        <div className="flex font-bold text-2xl sm:text-3xl items-center">

          <a href="#" className="flex ">
            <img src={Logo} alt="" className="h-8" />
            Books
          </a>

        </div>
        <div>
          <DarkMode />
        </div>
        <ul className=" gap-4  items-center hidden sm:flex">
          {
            Menu.map((menu) => (
              <li key={menu.id} className="inline-block hover:text-blue-700">
                <div className="font-bold uppercase text-xl sm:text-xs"><a href={menu.link}>{menu.name}</a></div>
              </li>
            ))
          }



        </ul>
        <VerticalMenu Menu={Menu} />
      </div>

    </div>
  )
}

export default Header
