import React from 'react'

const Card = ({book}) => {
  return (
    <div className=" flex items-center flex-col">
      
       <img className=" h-36 w-20" src={book.imageUrl}/>
       <p className="flex justify-start">{book.title}</p>
    </div>
  )
}

export default Card
