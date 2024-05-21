import React from 'react'
import CardSlider from './CardSlider';
import { useState , useEffect } from 'react';
import axios from 'axios';


const BestSellers = () => {
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
    <div className='h-auto py-2'>
        <span className="font-serif font-bold text-cyan-950 hover:shadow-md flex items-center justify-center">BEST SELLERS</span>
      <CardSlider books={books} title="BEST SELLER"/>
    </div>
  )
}

export default BestSellers
