import React, { useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CircleIcon from '@mui/icons-material/Circle';
const Slider = ({slides}) => {
    const [currentIndex , setCurrentIndex] = useState(0);

    const prevSlide = () =>{
        const isFirstSlide = currentIndex === 0 ;
        const newIndex = isFirstSlide? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex); 
    }

    const nextSlide = () =>{
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }


  return (
    
    <div
    className='sm:relative w-full h-full sm:h-screen rounded-2xl bg-center bg-cover duration-500 transform-cpu relative'>
        <div className="h-full">
        <img className="h-full w-full flex items-center justify-center " src={slides[currentIndex]} alt="" />

        <div className="absolute sm:block top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-xl rounded-full bg-white/20 p-2 cursor-pointer "><KeyboardArrowLeftIcon onClick={prevSlide}/></div>
        <div className="absolute sm:block top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-xl rounded-full bg-white/20 p-2 cursor-pointer"><KeyboardArrowRightIcon onClick={nextSlide}/></div>
        </div>
        
    </div>

  )
}

export default Slider
