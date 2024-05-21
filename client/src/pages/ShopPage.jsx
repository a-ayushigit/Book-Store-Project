import React from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../components/Card';
const ShopPage = () => {
  const location = useLocation();
  const books = (location.state.books.books);
  console.log(books);
  return (
    <div className="grid grid-cols-12 h-screen m-5 relative p-5" >
      <div className="col-span-3 h-screen border border-r-black">
      <p className="p-2">FILTER </p> 
      <div className="flex justify-center">
     
      </div>
      </div>
      <div className="col-span-9 h-screen">
        <div className="grid grid-cols-12 w-full">
        {books && books.map((book,id)=>(
      <div key={id} className="h-auto grid col-span-12 md:col-span-4 sm:grid sm:col-span-6 " ><Card className="" book = {book} /></div>
     ))}
        </div>
    

      </div>
    </div>
  )
}

export default ShopPage
