import axios from 'axios';
import React, { useState, useEffect } from 'react'

const Hero = () => {
    const [book, setBook] = useState([]);
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('https://book-store-project-backend-0ij2.onrender.com/api/v1/books');
                if (response.status === 200) {
                    
                    setBook(response.data.books[0]);
                    // console.log(response.data.books );
                    console.log(book);
                }

            }
            catch (e) {
                console.log(e);
            }
        }
        fetchBooks();
    }, [])
    return (
        <div className="px-auto">
            
            <div className="px-3 py-3 min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-red-800 dark:text-white duration-200 ">
                <div className="container pb-8 sm:pb-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 ">

                        <div  className="">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold m-1 sm:m-2 ">
                                {book.title}
                                <p className="bg-clip-text  text-black text-right text-sm dark:text-white m-1 sm:m-2">
                                   by  {book.author}
                                </p>
                            </h1>
                            <p className="text-sm">
                                {book.description}
                            </p>
                            <div>
                                <button className=" m-1 px-4 py-2 hover:scale-105 duration-200 dark:bg-red-400 rounded-full bg-teal-600 font-bold sm:m-2">
                                    Order Now
                                </button>
                            </div>
                        </div>
                        <div className="p-4 m-4 place-self-center">
                            <img src ={book.imageUrl} alt=""/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Hero
