import axios from 'axios';
import React, { useState, useEffect } from 'react'

const Hero = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/v1/books');


                if (response.status === 200) {
                    setBooks(response.data.books.slice(0, 3));
                    // console.log(response.data.books );
                }

            }
            catch (e) {
                console.log(e);
            }
        }
        fetchBooks();
    }, [])
    return (
        <div>
            {/* {books && books.map((book)=>(
            <p key={book._id}>{book.title}</p>
        )
    )} */}
            <div className="min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-red-800 dark:text-white duration-200">
                <div className="container pb-8 sm:pb-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2">

                        <div >
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
                                Hero
                                <p className="bg-clip-text text-transparent text-right text-sm dark:text-white">
                                    by Anonymous
                                </p>
                            </h1>
                            <p className="text-sm">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio nisi eligendi in dignissimos vel voluptatum molestias, voluptatem odio debitis, quibusdam dolore aliquam voluptas eius tempore at necessitatibus, unde quae quia.
                            </p>
                            <div>
                                <button className=" px-4 py-2 hover:scale-105 duration-200 dark:bg-red-400 rounded-full bg-teal-600 font-bold">
                                    Order Now
                                </button>
                            </div>
                        </div>
                        <div>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Hero
