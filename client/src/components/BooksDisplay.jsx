import React from 'react'
import Card from '../components/Card';
import { Link } from 'react-router-dom'
const BooksDisplay = ({books , open}) => {
  return (
    <div className="grid grid-cols-12 ">
          {books && books.map((book, id) => (
            <div key={id} className={` size-auto grid col-span-12 ${open ? "col-span-12 md:col-span-6" :"col-span-12 sm:col-span-4"  }  p-2 m-4 my-8 border shadow-2xl`} ><Card className="" book={book} /></div>
          ))}
      </div>
  )
}

export default BooksDisplay
