import React from 'react'
import img1  from "../assets/IconImages/icon1.png"
import img2  from "../assets/IconImages/icon2.png"
import img3 from "../assets/IconImages/icon3.png"
import img4 from "../assets/IconImages/icon4.png"
import img5  from "../assets/IconImages/icon5.png"
import img6  from "../assets/IconImages/icon6.png"
import img7  from "../assets/IconImages/icon7.png"
import img8 from "../assets/IconImages/icon14.svg"




const CategoryList = () => {
  return (
    <div className="grid grid-cols-2 sm:grid sm:grid-cols-4 gap-2 p-2 object-cover bg-cyan-100 dark:bg-red-800">
     <div className="text-xs sm:text-sm  hover:cursor-pointer col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl dark:bg-red-400  bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:scale-105"><img src={img1} alt="" /><p> BEST SELLERS </p></div>
     <div className="text-xs sm:text-sm  hover:cursor-pointer col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl dark:bg-red-400  bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:scale-105"><img  src={img3} alt="" /><p>24 HR DEALS</p></div>
     <div className="text-xs sm:text-sm hover:cursor-pointer  col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl dark:bg-red-400  bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:scale-105"><img  src={img2} alt="" /><p>FICTION FRENZY</p></div>
     <div className="text-xs sm:text-sm hover:cursor-pointer  col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl dark:bg-red-400  bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:scale-105"><img  src={img4} alt="" /><p>CRAZY BOOKPACKS</p></div>
     <div className="text-xs sm:text-sm  hover:cursor-pointer col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl dark:bg-red-400  bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:scale-105"><img src={img5} alt="" /><p>ACADEMIC SECTION</p></div>
     <div className="text-xs sm:text-sm hover:cursor-pointer col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl dark:bg-red-400  bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:scale-105"><img src={img6} alt="" /><p>AWARD WINNERS</p></div>
     <div className="text-xs sm:text-sm hover:cursor-pointer col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl dark:bg-red-400  bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:scale-105"><img src={img7} alt="" /><p>GLOBAL FAVORITES</p></div>
     <div className="text-xs sm:text-sm hover:cursor-pointer  col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl dark:bg-red-400  bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:scale-105"><img className=" size-14" src={img8} alt="" /><p>HINDI COLLECTIONS</p></div>
    </div>
  )
} 
 
export default CategoryList
