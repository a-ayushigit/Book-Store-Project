import React from 'react'
import { RouterProvider, useLoaderData } from 'react-router-dom';
const BookPage = () => {
    const res = useLoaderData();
    // const {_id} = res._id;
    const data = res.book;
    console.log(data);
  return (
    
    <div >
      <div> SingleBook : </div>
    </div>
    
  )
}

export default BookPage
