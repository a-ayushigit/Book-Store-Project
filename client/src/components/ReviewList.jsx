import React , {useState , useEffect} from 'react'
import axios from 'axios';
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
    <div>
      {reviews.map((review, i)=>(
        <div key={i} className="bg-blue-500 text-white border border-blue-950 flex flex-col p-5 h-full w-full ">
           <p>{review.heading}</p>
           <p>{review.userId.fullname}</p>
        </div>
      ))}
    </div>
  )
}

export default ReviewList
