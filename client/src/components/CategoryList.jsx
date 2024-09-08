import React from 'react'
import img1  from "../assets/IconImages/icon1.png"
import img2  from "../assets/IconImages/icon2.png"
import img3 from "../assets/IconImages/icon3.png"
import img4 from "../assets/IconImages/icon4.png"
import img5  from "../assets/IconImages/icon5.png"
import img6  from "../assets/IconImages/icon6.png"
import img7  from "../assets/IconImages/icon7.png"
import img8 from "../assets/IconImages/icon14.svg"

import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const CategoryList = () => {
  
  const navigate = useNavigate();

  async function handleClick (tag = "" , lang = "" , cat="") {
    let books , response ;
    try {
      if(tag !== ""){
        response = await axios.get(`/books?tag=${tag}`);
      }
      else if(cat !== ""){
        response = await axios.get(`/books?category=${cat}`);
      }
      else {
        response = await axios.get(`/books?lang=${lang}`);
      }
      books = response.books;
      console.log(books);
     //navigate('/shop' , {state:{books:books}});
      
    } catch (error) {
      console.log(error);
    }
    
    
       
  }

  return (<>
    <div className="grid grid-cols-2 sm:grid sm:grid-cols-4 gap-2 p-2  bg-cyan-100 dark:bg-red-800">
     <div onClick={()=>handleClick("Best Seller","" ,"")} className="h-12 w-30 p-2 sm:h-auto sm:w-auto text-xs sm:text-sm  hover:cursor-pointer col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl dark:bg-red-400  bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:scale-105"><img className="size-5 sm:size-14 flex justify-center text-wrap" src={img1} alt="" /><p> BEST SELLERS </p></div>
     <div onClick={()=>handleClick("24 hr deals","","")} className="h-12 w-30 p-2 sm:h-auto sm:w-auto text-xs sm:text-sm  hover:cursor-pointer col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl dark:bg-red-400  bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:scale-105"><img className="size-5 sm:size-14 flex justify-center text-wrap" src={img3} alt="" /><p>24 HR DEALS</p></div>
     <div onClick={()=>handleClick("","", "Fiction")} className="h-12 w-30 p-2 sm:h-auto sm:w-auto text-xs sm:text-sm hover:cursor-pointer  col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl dark:bg-red-400  bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:scale-105"><img className="size-5 sm:size-14 flex justify-center text-wrap" src={img2} alt="" /><p>FICTION FRENZY</p></div>
     <div onClick={()=>{}} className="h-12 w-30 p-2 sm:h-auto sm:w-auto text-xs sm:text-sm hover:cursor-pointer  col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl dark:bg-red-400  bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:scale-105"><img className="size-5 sm:size-14 flex justify-center text-wrap" src={img4} alt="" /><p>CRAZY BOOKPACKS</p></div>
     <div onClick={()=>{}} className="h-12 w-30 p-2 sm:h-auto sm:w-auto text-xs sm:text-sm  hover:cursor-pointer col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl dark:bg-red-400  bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:scale-105"><img className="size-5 sm:size-14 flex justify-center text-wrap" src={img5} alt="" /><p>ACADEMIC SECTION</p></div>
     <div onClick={()=>handleClick("New Arrivals","","")} className="h-12 w-30 p-2 sm:h-auto sm:w-auto text-xs sm:text-sm hover:cursor-pointer col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl dark:bg-red-400  bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:scale-105"><img className="size-5 sm:size-14 flex justify-center text-wrap" src={img6} alt="" /><p>NEW ARRIVALS</p></div>
     <div onClick={()=>handleClick("International Best Sellers","","")} className="h-12 w-30 p-2 sm:h-auto sm:w-auto text-xs sm:text-sm hover:cursor-pointer col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl dark:bg-red-400  bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:scale-105"><img className="size-5 sm:size-14 flex justify-center text-wrap" src={img7} alt="" /><p>GLOBAL FAVORITES</p></div>
     <div onClick={()=>handleClick("","Hindi","")} className="h-12 w-30 p-2 sm:h-auto sm:w-auto text-xs sm:text-sm hover:cursor-pointer  col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl dark:bg-red-400  bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:scale-105"><img className="size-5 sm:size-10 flex justify-center text-wrap" src={img8} alt="" /><p>HINDI PICKS</p></div>
    </div>
    {/* <BestSellers className="row-span-3" /> */}
    </>)
} 
 
export default CategoryList;
