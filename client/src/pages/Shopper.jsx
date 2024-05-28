import React, { useEffect } from 'react'
import {useState} from "react";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import Pagination from '../components/Pagination';
import axios from 'axios';

import BooksDisplay from '../components/BooksDisplay';
const LIMIT = 12;

const genres = [
  "Fiction",
  "Classic",
  "Drama",
  "Historical",
  "Mystery",
  "Philosophical",
  "Adventure",
  "Romance",
  "Satire",
  "Children",
  "Poetry",
  "Dystopian",
  "Science Fiction",
  "Social",
  "Non-Fiction",
  "Autobiography",
  "Comedy",
  "Fantasy"
];

const languages = [
  "English",
  "French",
  "Spanish",
  "German",
  "Italian",
  "Japanese",
  "Chinese",
  "Russian",
  "Hindi"
];

const tags = [
  "Best Seller",
  "Trending",
  "International Best Sellers",
  "24 hr deals",
  "Academic",
  "Crazy Bookpacks"
];

const bindingItems = [
"Paperback"  , "Hardcover"
];



const Shopper = () => {
    const [curPage, setcurPage] = useState(1);
  
    const [open , setOpen] = useState(false);
  
    const [selectedGenres , setSelectedGenres] = useState([]);
    const [selectedTags , setSelectedTags] = useState([]);
    const [selectedLanguages , setSelectedLanguages] = useState([]);
    const [binding , setBinding] = useState([]);
    const [books, setBooks] = useState([]);
    const [totalBooks, setTotalBooks] = useState(0);
    const [maxPrice , setMaxPrice] = useState(1000);
    const [rating , setRating] = useState(5);
    
    const[url , setUrl] = useState("");
    
    let query1 = "" , query2="" , query3="" , query4="" , query5="";

    let curUrl="";

    //useEffect for query and pagination 
    useEffect(()=>{
        //the variables which are modified inside the useEffect cannot be passed in the dependency array as it will cause an infinite loop
        
        query1 = selectedGenres.length?`&category=${selectedGenres.join(',')}`:"";
        query2 = selectedTags.length?`&tag=${selectedTags.join(',')}`:"";
        query3 = selectedLanguages.length?`&lang=${selectedLanguages.join(',')}`:"";
        query4 = binding.length?`&binding=${binding.join(',')}`:"";
        query5 = `&numericFilters=price<=${maxPrice},rating>=${rating}`;
        console.log(query5);



        curUrl = `http://localhost:5000/api/v1/books?page=${curPage}&limit=${LIMIT}${query1}${query2}${query3}${query4}${query5} `;
         setUrl(curUrl);

    } , [selectedGenres , curPage , selectedTags , selectedLanguages , binding , maxPrice , rating])
  

    //useEffect for url 

    useEffect(()=>{
        if(url){
            axios.get(url).then((response)=>{
                setBooks(response.data.books);
                setTotalBooks(response.data.total);
                
            }).catch((err)=>console.log(err)).finally(
                console.log(books)
            )
        }
      

    } , [url])

    function pageArrayCalculator(totalBooks, LIMIT) {
        let pages = [];
        const final = Math.ceil(((totalBooks)) / LIMIT);
        console.log(final);
        for (let i = 1; i <= final; i++) {
          pages.push(i);
        }
    
        return pages;
      }

      const handleGenreFilter = (e) =>{
        const value = e.target.value;
        const checked = e.target.checked;
        setSelectedGenres(checked?[...selectedGenres , value]:selectedGenres.filter((item)=>item !== value));
        console.log(1);
        console.log(selectedGenres)
       
      }

      const handleTagFilter = (e) =>{
        const value = e.target.value;
        const checked = e.target.checked;
        setSelectedTags(checked?[...selectedTags , value]:selectedTags.filter((item)=>item !== value));
        console.log(2);
        console.log(selectedTags)
       
      }

      const handleBindingFilter = (e) =>{
        const value = e.target.value;
        const checked = e.target.checked;
        setBinding(checked?[...binding , value]:binding.filter((item)=>item !== value));
        console.log(2);
        console.log(binding)
      }

      const handleLanguagesFilter = (e) =>{
        const value = e.target.value;
        const checked = e.target.checked;
        setSelectedLanguages(checked?[...selectedLanguages , value]:selectedLanguages.filter((item)=>item !== value));
        console.log(2);
        console.log(selectedLanguages)
       
      }


  return (
    <div className="bg-pink-400 min-h-screen max-h-[300rem] flex h-auto ">
      <div className={`bg-blue-500 ${open?"w-[35vw] max-w-[35vw]":"hidden"} relative transform duration-900`}>
     {/* genres */}
      <h3 className="font-serif font-bold">Genre</h3>
               <ul className="sm:grid grid-cols-6">
               {genres.map((genre,id)=>(
              <li key={id} className="flex flex-row text-sm gap-2 sm:col-span-3">
                 <input type="checkbox" defaultChecked={false} value={genre} onChange={handleGenreFilter}/><p className="flex "> {genre}</p>
              </li>
               ))}
             </ul>
       {/* categories */}
             <h3 className="font-serif font-bold">Categories</h3>
              <ul className="sm:grid grid-cols-6">
              {tags.map((tag,id)=>(
             <li key={id} className="flex flex-row text-sm gap-2 sm:col-span-3 justify-start">
               <div className="inline-flex ">
               <input type="checkbox"  defaultChecked={false} value={tag} onChange={handleTagFilter}/><label className="flex "> {tag}</label>
                </div> 
             </li>
              ))}
             </ul>
             {/* price */}
             <h3 className="font-serif font-bold">Price</h3>
             <div className="flex flex-row gap-3 object-contain px-2">

             <span className="text-xs sm:text-sm">Rs.0</span>
             <input type="range" min={0} max={60} className="flex flex-wrap w-[12vw]" onChange={(e)=>setMaxPrice(e.target.value)}/>
              <span className="text-xs sm:text-sm">Rs.60</span>
              <span className="text-wrap text-xs sm:text-sm">Max Price:- Rs.{maxPrice}</span>
             </div>
             {/* rating */}
             <h3 className="font-serif font-bold">Rating</h3>
             <div className="flex flex-row gap-3 object-contain px-2">

             <span className="text-xs sm:text-sm">0</span>
             <input type="range" min={0} max={5} className="flex flex-wrap w-[12vw]" onChange={(e)=>setRating(e.target.value)}/>
              <span className="text-xs sm:text-sm">5</span>
              <span className="text-wrap text-xs sm:text-sm">Rating {rating}</span>
             </div>

        {/* binding */}
        <h3 className="font-serif font-bold">Binding</h3>
        <ul className="sm:grid grid-cols-6">
              {bindingItems.map((b,id)=>(
             <li key={id} className="flex flex-row text-sm gap-2 sm:col-span-3 justify-start">
               <div className="inline-flex ">
               <input type="checkbox"  defaultChecked={false} value={b} onChange={handleBindingFilter}/><label className="flex "> {b}</label>
                </div> 
             </li>
              ))}
             </ul>
        {/* languages */}
        <h3 className="font-serif font-bold">Languages</h3>
              <ul className="sm:grid grid-cols-6">
              {languages.map((lang,id)=>(
             <li key={id} className="flex flex-row text-sm gap-2 sm:col-span-3 justify-start">
                <input type="checkbox"  defaultChecked={false} value={lang} onChange={handleLanguagesFilter}/><p className="flex "> {lang}</p>
             </li>
              ))}
             </ul>

      </div>
      <div>
        {/* top second nav */}
       <div className="flex flex-row">
       <span className="flex m-1 border h-12 w-20 p-4 justify-center items-center text-sm hover:cursor-pointer" onClick={()=>setOpen(!open)}>FILTER{open?<ArrowLeftIcon/>:<FilterListIcon/>} </span>
       <span className="flex m-1 border h-12 w-20 p-4 justify-center items-center text-sm hover:cursor-pointer">SORT <SortIcon/></span>
        {/* search bar */}
       </div>


       <BooksDisplay books={books}/>
       <Pagination totalBooks={totalBooks}  LIMIT={LIMIT}   pageArrayCalculator={pageArrayCalculator} curPage={curPage} setcurPage={setcurPage} />
      </div>
    </div>
  )
}

export default Shopper
