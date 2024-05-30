import React, { useContext } from 'react'
import CartProvider, { CartContext } from '../Contexts/CartContext'
import { useNavigate } from 'react-router-dom';

const Card = ({ book }) => {
  const cart = useContext(CartContext);
  
  return (
    <div className="flex flex-row relative  h-auto max-h-30 sm:max-h-40">

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
          <div className="flex flex-row gap-3 py-2 px-2 justify-around">
          <button className="light text-xs text-wrap dark:bg-red-900 hover:shadow-2xl " onClick={()=>{
            cart.addToCart(book);
           
            console.log(cart.items);
            
          }}>Add To Cart </button>
          <button className="light text-xs whitespace-break-spaces dark:bg-red-900 hover:shadow-2xl w-full" onClick={()=>{
            navigate(`/book/${book._id}`)
          }}>View Details </button>
          </div>
         
        </div>

      </div>

    </div>
  )
}

export default Card
