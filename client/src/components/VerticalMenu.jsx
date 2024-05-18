import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from 'react'

const VerticalMenu = ({Menu}) => {
    const [click , setClick] = useState(false);
    const handleNavbar = () =>{
        setClick(!click);
    }
  return (
    <div className="flex-col justify-center items-center sm:hidden" onClick={handleNavbar}>

        {click?<CloseIcon />:<MenuIcon/>}
        <ul className={click?"fixed flex-col justify-center place-items-center top-0 z-50 w-[60%] ease-in-out duration-700 bg-white left-0  h-full transform":"hidden"}>
       {
        Menu.map((menu)=>(
          <li  key={menu.id} className="flex justify-center p-5 gap-1 mt-4 hover:text-blue-700">
            <div ><a  href={menu.link}>{menu.name}</a></div>
          </li>
        ))
       }
       
       </ul>
      
    </div>
  )
}

export default VerticalMenu
