import React, { useState } from 'react'
import axios from 'axios'
import blankstar from '../assets/IconImages/blank-star.svg'
import fullstar from '../assets/IconImages/star-blank.svg'
import { useContext } from 'react'
import {UserContext} from '../Contexts/UserContext'
const ReviewComponent = ({bookId}) => {
    
    const [headline , setHeadline] = useState("");
    const [review , setReview] = useState("");
    const [rating,setRating] = useState(0);
    const [hover , setHover] = useState(0);
    const {user} = useContext(UserContext);
    // console.log(user._id);
    console.log(bookId);
    const handleSubmit = async () => {
        try {
            const res = await axios.post(`reviews/create/${user._id}`, {
                "userId":user._id,
                "bookId":bookId,
                "description":review,
                "heading":headline,
                "ratings":rating,
            });
            console.log(res);
            setRating(0);
            setHover(0);
            setReview("");
            setHeadline("");
        } catch (error) {
            console.log(error.response.data.code );
           if(error.response && error.response.data.code === 11000){
            alert('You have already submitted a review for this book !!!');
           } 
           else{
            alert('Error uploading the review :' , error);
            console.log(error);
           }
        }
  
    }
  return (
    <div className="h-full min-h-screen flex flex-col self-center justify-self-center items-center  w-auto ">
        <div className="shadow-md flex flex-col self-center justify-self-center items-center p-5 bg-blue-100 ">
        <p className="font-bold text-lg flex ">Create review ....</p>
      <div className="h-full w-auto flex flex-col text-nowrap items-center gap-2 p-1">
      <div className="flex flex-row gap-5 items-center justify-center">
        <div>
        <p className="text-bold text-lg font-semibold"> Overall Rating</p>
        </div>
       <div className="flex flex-row gap-1">
       {Array.from({length:5}).map((_,i)=>
    (
       <div 
       key={i}
       onMouseEnter={()=>setHover(i+1)}
       onMouseLeave={()=>setHover(0)}
       onClick={()=>{setRating(i+1); console.log(rating)}}
       >
        <img src={((hover || rating) > i ? fullstar : blankstar)} className="h-10 w-8 flex text-white cursor-pointer"/>
       </div> 
    ))}
       </div>
     
    </div>
      </div>
      <hr/>
      <div>
        <label className="text-lg font-semibold">Add a headline </label>
        <input type="text" value={headline} onChange={(e)=>setHeadline(e.target.value)}/>
      </div>
      <div>
      <label className="text-lg font-semibold">Write a review</label>
      <textarea className="rounded-lg w-full h-auto border border-blue-950 p-4 min-h-72" value={review} onChange={(e)=>setReview(e.target.value)}  />
      </div>
      <button className="flex p-2 bg-yellow-300 border border-yellow-950 text-yellow-950 font-bold rounded-md hover:scale-95" onClick={()=>handleSubmit()}>
        Submit
      </button>
        </div>

    </div>
  )
}

export default ReviewComponent
