import React from 'react'
import { useState , useEffect } from 'react';
import axios from 'axios';
import Book from './Book';

const BestSeller = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/books');


                if (response.status === 200) {
                    
                    setBooks(response.data.books.slice(0,10));
                    // console.log(response.data.books );
                    console.log(books);
                }

            }
            catch (e) {
                console.log(e);
            }
        }
        fetchBooks();
    }, [])
  return (
    <div className="h-[85vh] dark:bg-red-200  ">
    <div className="flex  justify-around text-3xl my-5 dark:text-red-900">
        BEST SELLING BOOKS
    </div>
    <div>
       <Book books={books} />
    </div>
     
    </div>
  )
}

export default BestSeller

