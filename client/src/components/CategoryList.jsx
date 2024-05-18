import React from 'react'
import img1  from "../assets/IconImages/icon1.png"
import img2  from "../assets/IconImages/icon2.png"
import img3 from "../assets/IconImages/icon3.png"
import img4 from "../assets/IconImages/icon4.png"
import img5  from "../assets/IconImages/icon5.png"
import img6  from "../assets/IconImages/icon6.png"
import img7  from "../assets/IconImages/icon7.png"
import img8 from "../assets/IconImages/icon8.png"




const CategoryList = () => {
  return (
    <div className="grid grid-cols-2 sm:grid sm:grid-cols-4 gap-5 p-5 h-full">
     <div className="col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:will-change-transform"><img src={img1} alt="" /></div>
     <div className="col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:will-change-transform"><img  src={img3} alt="" /></div>
     <div className="col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:will-change-transform"><img  src={img2} alt="" /></div>
     <div className="col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:will-change-transform"><img  src={img4} alt="" /></div>
     <div className="col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:will-change-transform"><img src={img5} alt="" /></div>
     <div className="col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:will-change-transform"><img src={img6} alt="" /></div>
     <div className="col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:will-change-transform"><img src={img7} alt="" /></div>
     <div className="col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:will-change-transform"><img src={img8} alt="" /></div>
    </div>
  )
} 

export default CategoryList
