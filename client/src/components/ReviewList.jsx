import React , {useState , useEffect} from 'react'
import axios from 'axios';
import fullstar from '../assets/IconImages/star-blank.svg'
const ReviewList = ({bookId}) => {
    const [reviews,setReviews] = useState([]);
    const getReviews = async() =>{
      const data = await axios.get(`/reviews/getreview/${bookId}`);
      console.log(data.data.reviews);
      setReviews(data.data.reviews);
    } 
    useEffect(()=>{
     getReviews();
    },[])
  return (
    <div className="flex flex-col justify-center p-2 gap-2 max-h-full">
      {reviews.map((review, i)=>(
        <div key={i} className="bg-cyan-100 dark:bg-red-300 text-blue-950 border border-blue-950 flex flex-col p-5 h-full w-full rounded-lg self-center shadow-lg">
          <div className="flex justify-between">
          <p className="text-sm sm:text-lg md:text-2xl font-semibold capitalize italic">"{review.heading}"</p>
           <div className="flex">{Array.from({length:review.ratings}).map((_,i)=>(
            <div key={i}>
              <img src={fullstar}/>
            </div>
           ))}</div>
          </div>
         
           <p className="font-bold italic sm:text-lg text-sm">~{review.userId.fullname}</p>
           <p className="italic sm:text-sm text-xs">"{review.description}"</p>

        </div>
      ))}
    </div>
  )
}

export default ReviewList
