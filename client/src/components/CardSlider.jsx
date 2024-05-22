import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';



const CardSlider = ({books , title}) => {
    const slideLeft = () =>{
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    }
    const slideRight = () =>{
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    }
console.log(books);
    const navigate = useNavigate();
  return (
    <div  className="relative flex items-center ">
        <KeyboardArrowLeftIcon className="relative p-1 hidden hover:block rounded-full bg-transparent hover:bg-indigo-300" onClick={slideLeft}/>
        <div id="slider" className="flex w-full h-full overflow-x-scroll overflow-y-hidden  scroll whitespace-nowrap scroll-smooth no-scrollbar">

         
      {books && books.map((book)=>
      <div key={book._id} className="transform hover:scale-105 hover:border ease-in-out duration-1500 gap-1 pr-1 ">
         <Link to={`/book/${book._id}`} >
           <div className="h-[19rem] flex items-center w-[200px] p-1 " >
           <img className="h-[15rem] w-[10rem] sm:h-[18rem] sm:w-[12rem]  cursor-pointer " src={book.imageUrl}/>
           </div>
            <div className="flex justify-center p-1 flex-wrap flex-auto ">
                <p  className="py-3 flex justify-center  bg-blue-500 px-6 text-white dark:bg-red-800 font-bold w-full">
                    {title}
                </p>
            </div>
            <div className="text-wrap text-xs font-bold">
            <h3 className="z-20 pt-50 object-fit">{book.title}</h3>  
            <p>Author: {book.author}</p>
            <p>Rs. {book.price}</p>
            </div>
            </Link>
            </div>
      )}
      
        </div>
        <KeyboardArrowRightIcon className="relative p-1 hidden  rounded-full bg-transparent hover:bg-indigo-300 pl-1" onClick={slideRight}/>
    </div>
  )
}

export default CardSlider
