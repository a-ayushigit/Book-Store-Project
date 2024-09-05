import React , {useState , useEffect} from 'react'
import { RouterProvider, useLoaderData } from 'react-router-dom';
const BookPage = () => {
   const [bookdetails , setBookdetails] = useState(null);
   const res = useLoaderData();
  
   const data = res.book;
   useEffect(()=>{

    console.log(data);
    setBookdetails(data);
   },[])

  return (
    
    <div >
      <div> SingleBook : {bookdetails.title}</div>
    </div>
    
  )
}

export default BookPage
