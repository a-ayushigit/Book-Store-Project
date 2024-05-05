 import React from 'react'
 import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

 
 const Book = ({books}) => {
   return (
     <div className="py-1">
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
            books && books.map(book => <SwiperSlide key={book._id}>
                <Link to={`/book/${book._id}`}>
                    <div className="relative">
                        <img className="h-[50vh] w-[30vw]" src={book.imageUrl} alt="" />
                        <div className="absolute p-2 top-3 right-3  bg-blue-400  rounded  hover:bg-black dark:bg-red-700 dark:hover:bg-black">
                            <ShoppingCartIcon className="h-4 w-4 text-white "/>
                        </div>
                    </div>
                    <div>
                        <h3>{book.title}</h3>
                        <p >{book.author}</p>
                        <p>Rs.{book.price}</p>
                    </div>
                </Link>
            </SwiperSlide>)

        }
      </Swiper>
       
     </div>
   )
 }
 
 export default Book
 