import React, { useContext } from 'react'
import CartProvider, { CartContext } from '../Contexts/CartContext'
import { Link, useNavigate } from 'react-router-dom';

const Card = ({ book }) => {
  const cart = useContext(CartContext);
  
  return (
    <div className="flex flex-row relative   h-auto max-h-30 sm:max-h-40">

      <div className="flex"><img className=" h-36 w-auto" src={book.imageUrl} /></div>
      <div className="flex gap-1 object-contain max-h-40 m-4">
        <div className="flex items-center flex-col max-h-40 ">
          <p className="flex justify-start text-wrap p-1 text-sm font-serif font-semibold break-words">{book.title}</p>
          <p className="flex justify-start text-wrap pl-2 text-yellow-700 text-xs  font-bold self-start">by {book.author}</p>
          <p className="flex justify-start text-wrap font-bold text-sm ">Rs. {book.price}</p>
          <p className="flex justify-start text-wrap font-bold text-xs text-gray-700">{book.binding}</p>
          {/* <p className="flex justify-start text-wrap font-bold text-xs text-gray-700">{book.category}</p> */}
          <div className="absolute m-0 p-1 top-0 right-0 h-8 w-16 bg-red-500 rounded text-white ">
            {`${book.discount}% off`}
          </div>
          <div className="flex flex-row h-[3rem] gap-1 py-2 px-2 justify-around">
          <button className="light flex  h-[2rem]  text-nowrap object-contain  justify-center items-center  text-xs  dark:bg-red-900 hover:scale-105 " onClick={()=>{
            cart.addToCart(book);
            alert("Book added successfully!");
            console.log(cart.items);
            
          }}> <p>Add To Cart</p>  </button>
          
          <button className="light flex h-[2rem] text-nowrap object-contain justify-center items-center  text-xs  dark:bg-red-900 hover:scale-105 w-full" onClick={()=>{
            
          }}><Link to={`/book/${book._id}`}> View Details</Link> </button>
          
          </div>
         
        </div>

      </div>

    </div>
  )
}

export default Card
