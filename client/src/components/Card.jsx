import React from 'react'

const Card = ({book}) => {
  return (
    <div className="flex flex-row relative ">
      
      <div className="flex"><img className=" h-36 w-20" src={book.imageUrl}/></div> 
      <div className="flex gap-1">
        <div className="flex items-center flex-col">
        <p className="flex justify-start text-wrap p-1 text-sm font-serif font-semibold break-words">{book.title}</p>
       <p className="flex justify-start text-wrap pl-2 text-yellow-700 text-xs  font-bold self-start">by {book.author}</p>
       <p className="flex justify-start text-wrap font-bold text-sm ">Rs. {book.price}</p>
       <p className="flex justify-start text-wrap font-bold text-xs text-gray-700">{book.binding}</p>
       <p className="flex justify-start text-wrap font-bold text-xs text-gray-700">{book.category}</p>
       <div className="absolute m-0 p-1 top-0 right-0 h-8 w-16 bg-red-500 rounded text-white ">
      {`${book.discount}% off`}
      </div> 
        </div>
       
       </div>
       
    </div>
  )
}

export default Card
