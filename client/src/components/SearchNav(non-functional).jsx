import React, { useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import MenuIcon from '@mui/icons-material/Menu';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import SearchBarComponent from './SearchBarComponent';
 




const SearchNav = () => {
  const [open , setOpen] = useState(false);
  return (
    <div className="ml-0 pl-0 h-14 w-full dark:bg-red-400 dark:text-red-950  bg-blue-950 text-white flex flex-row m-0 p-0 place-self-start  shadow-lg">
         {/* sidebar */}
      <div className={`bg-blue-950 h-[181vh] z-50 ${open ? "w-[25vw]":"w-[0vw]"} duration-300`}>
       <div className={`${open ? "flex p-2 m-2 flex-col gap-5":"hidden" }`}>
              <h3 className="font-serif font-bold">Genre</h3>
              <ul>
              {genres.map((genre,id)=>(
             <li key={id} className="flex flex-row text-sm gap-2">
                <input type="checkbox"/><p className="flex "> {genre}</p>
             </li>
              ))}
             </ul>
             <h3 className="font-serif font-bold">Price</h3>
             <div className="flex flex-row gap-3">

             <span>Rs.0</span>
             <input type="range" />
              <span>Rs.10000</span>
             </div>

             <h3 className="font-serif font-bold">Binding</h3>
             <ul>
                <li className="flex flex-row text-sm gap-2">
                <input type="checkbox"/><p className="flex "> Paperback</p>
                <input type="checkbox"/><p className="flex "> Hardcover</p>  
                </li>
             </ul>
             <h3 className="font-serif font-bold">Languages</h3>
              <ul>
              {languages.map((lang,id)=>(
             <li key={id} className="flex flex-row text-sm gap-2">
                <input type="checkbox"/><p className="flex "> {lang}</p>
             </li>
              ))}
             </ul>
       </div>
       </div>
        {/* filter and sort */}
     <div className="flex flex-row">
      <span className="flex m-1 border h-12 w-20 p-4 justify-center items-center text-sm hover:cursor-pointer" onClick={()=>setOpen(!open)}>FILTER{open?<ArrowLeftIcon/>:<FilterListIcon/>} </span>
      <span className="flex m-1 border h-12 w-20 p-4 justify-center items-center text-sm hover:cursor-pointer">SORT <SortIcon/></span>
     
     </div>
     {/* search bar */}
     <div>
     <SearchBarComponent/>
     </div>
      
    </div>
  )
}

export default SearchNav
