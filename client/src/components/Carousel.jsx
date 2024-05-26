import React from 'react'
import img1 from "../assets/IconImages/icon1.png"
import img2 from "../assets/IconImages/icon2.png"
import img3 from "../assets/IconImages/icon3.png"
import img4 from "../assets/IconImages/icon4.png"
import img5 from "../assets/IconImages/icon5.png"
import img6 from "../assets/IconImages/icon6.png"
import img7 from "../assets/IconImages/icon7.png"
import img8 from "../assets/IconImages/icon14.svg"

import SlidingBooks from './SlidingBooks'
import axios from 'axios'
import { useState } from 'react'

export const catList = [
    {
        id: 1,
        title: "BEST SELLERS",
        img: img1,
        cat: "",
        tag: "Best Seller",
        lang: ""
    },
    {
        id: 2,
        title: "24 HR DEALS ",
        img: img3,
        cat: "",
        tag: "24 hr deals",
        lang: ""
    },
    {
        id: 3,
        title: "FICTION FRENZY",
        img: img2,
        cat: "Fiction",
        tag: "",
        lang: ""
    },
    {
        id: 4,
        title: "CRAZY BOOKPACKS",
        img: img4,
        cat: "",
        tag: "Crazy Bookpacks",
        lang: ""
    },
    {
        id: 5,
        title: "ACADEMIC SECTION",
        img: img5,
        cat: "",
        tag: "Academic",
        lang: ""
    },
    {
        id: 6,
        title: "Trending",
        img: img6,
        cat: "",
        tag: "Trending",
        lang: ""
    },
    {
        id: 7,
        title: "GLOBAL FAVORITES",
        img: img7,
        cat: "",
        tag: "International Best Sellers",
        lang: ""
    },
    {
        id: 8,
        title: "HINDI PICKS",
        img: img8,
        cat: "",
        tag: "",
        lang: "Hindi"
    }

]

const Carousel = () => {
    const [books,setBooks] = useState([]);
    const [title,setTitle] = useState("");
    async function handleClick(tag = "", lang = "", cat = "" ) {
      
        let response;
        try {
            if (tag !== "") {
                response = await axios.get(`http://localhost:5000/api/v1/books?tag=${tag}`);
                setTitle(tag);
            }
            else if (cat !== "") {
                response = await axios.get(`http://localhost:5000/api/v1/books?category=${cat}`);
                setTitle(cat);
            }
            else {
                response = await axios.get(`http://localhost:5000/api/v1/books?lang=${lang}`);
                setTitle(lang);
            }
            console.log(response.data)
            console.log(response.data.books);
          setBooks(response.data.books.slice(0,16));
            //console.log(books);


        } catch (error) {
            console.log(error);
        }
        
    }
    
    return (
        <div>
        <div className="h-[50vh] flex ">
            <div className="h-full w-full flex flex-col object-contain gap-1 p-2 dark:bg-red-800 bg-cyan-100  justify-center">
                <div className="flex justify-center">
                    <span className='font-serif shadow-md uppercase font-bold text-cyan-950 dark:text-black flex justify-center'> Categories  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid sm:grid-cols-4 gap-2 p-2  bg-cyan-100 dark:bg-red-800">
                    {catList.map((cat) =>

                        <div key={cat.id} onClick={() => handleClick(cat.tag, cat.lang, cat.cat) } className="  h-auto w-30 p-1 sm:h-auto sm:w-auto text-xs sm:text-sm  hover:cursor-pointer col-span-1 flex justify-center items-center border-solid border-indigo-100 shadow-sm hover:shadow-2xl dark:bg-red-400  bg-cyan-400 border-separate rounded-2xl gap-3 transform duration:300 ease-in-out hover:scale-105"><img className="size-5 sm:size-14 flex justify-center text-wrap" src={cat.img} alt="" /><p> {cat.title}</p></div>
                           

                    )}
                </div>



            </div>
        </div>
        <div>
        <SlidingBooks books={books} title={title} />
        </div>
        
        </div>
    )
}

export default Carousel
