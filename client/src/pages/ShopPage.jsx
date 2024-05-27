import React, { useState, useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useFetch from '../components/hooks/useFetch';
import Pagination from '../components/Pagination';
import axios from 'axios';

import BooksDisplay from '../components/BooksDisplay';

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

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
  "Academic Section",
  "Crazy Bookpacks"
];


const ShopPage = () => {

  const [curPage, setcurPage] = useState(1);
  
  const [open , setOpen] = useState(false);

  const [selectedGenres , setSelectedGenres] = useState([]);
  const [selectedTags , setSelectedTags] = useState([]);
  const [selectedLanguages , setSelectedLanguages] = useState([]);

  
  const[url , setUrl] = useState("");
  const[query , setQuery] = useState("");



  ///************************************************ */
   // console.log(query);
    
    // axios.get(`http://localhost:5000/api/v1/books?page=${curPage}&limit=${LIMIT}&${query}`).then((response) => {
    //   setBooks(response.data.books);
    //   //console.log(query);
    //   setTotalBooks(response.data.total);
    //   console.log(books);
    //   console.log(totalBooks);
    // }).catch((error) => { console.log(error) })

    //********************************* */
  
// useEffect(() => {
   
//     const genQuery = selectedGenres.length ? `&category=${selectedGenres.join(',')}` : " ";
//     setQuery(genQuery);
//     setUrl(`http://localhost:5000/api/v1/books?page=${curPage}&limit=${LIMIT}${query}`)
//     console.log(query);

//   }, [curPage , selectedGenres]) ;

  
//   const {books,totalBooks} = useFetch(url);

//   function pageArrayCalculator(totalBooks, LIMIT) {
//     let pages = [];
//     const final = Math.ceil(((totalBooks)) / LIMIT);
//     console.log(final);
//     for (let i = 1; i <= final; i++) {
//       pages.push(i);
//     }

//     return pages;
//   }

  const handleGenreFilter = (e) =>{
    const value = e.target.value;
    const checked = e.target.checked;
    setSelectedGenres(checked?[...selectedGenres , value]:selectedGenres.filter((item)=>item !== value));
    console.log(1);
    console.log(selectedGenres)
   
  }
  useEffect(()=>{
      console.log(3);
      console.log(selectedGenres)
      console.log(selectedGenres.join(','))

      const q =`${selectedGenres.length? selectedGenres.join(','):""}`;
      axios.get(`http://localhost:5000/api/v1/books?category=${q}`).then((response)=>{
        console.log(response.data.books);
      }).catch((err)=>console.log(err))
  } , [selectedGenres])



  return (
    // <div className="m-2 p-2" >
    //    <div className="ml-0 pl-0 h-14 w-full dark:bg-red-400 dark:text-red-950  bg-blue-950 text-white flex flex-row m-0 p-0 place-self-start  shadow-lg">
    //      {/* sidebar */}
    //   <div className={`bg-blue-950 h-[181vh] z-50 ${open ? "w-[25vw]":"w-[0vw]"} duration-300`}>
    //    <div className={`${open ? "flex p-2 m-2 flex-col gap-3":"hidden" }`}>
    //           <h3 className="font-serif font-bold">Genre</h3>
    //           <ul>
    //           {genres.map((genre,id)=>(
    //          <li key={id} className="flex flex-row text-sm gap-2">
    //             <input type="checkbox" defaultChecked={false} value={genre} onChange={handleGenreFilter}/><p className="flex "> {genre}</p>
    //          </li>
    //           ))}
    //          </ul>

    //          <h3 className="font-serif font-bold">Categories</h3>
    //           <ul>
    //           {tags.map((tag,id)=>(
    //          <li key={id} className="flex flex-row text-sm gap-2">
    //             <input type="checkbox"  checked={false} onChange={(e)=>console.log(e.target.checked)}/><p className="flex "> {tag}</p>
    //          </li>
    //           ))}
    //          </ul>

    //          <h3 className="font-serif font-bold">Price</h3>
    //          <div className="flex flex-row gap-3">

    //          <span>Rs.0</span>
    //          <input type="range" />
    //           <span>Rs.10000</span>
    //          </div>

    //          <h3 className="font-serif font-bold">Binding</h3>
    //          <ul>
    //             <li className="flex flex-row text-sm gap-2">
    //             <input type="checkbox"  checked={false} onChange={(e)=>{
    //               console.log(e.target.checked)

    //             }}/><p className="flex "> Paperback</p>
    //             <input type="checkbox"  checked={false} onChange={(e)=>{
    //              console.log(e.target.checked)
    //             }}/><p className="flex "> Hardcover</p>  
    //             </li>
    //          </ul>
    //          <h3 className="font-serif font-bold">Languages</h3>
    //           <ul>
    //           {languages.map((lang,id)=>(
    //          <li key={id} className="flex flex-row text-sm gap-2">
    //             <input type="checkbox"  checked={false} onChange={(e)=>{
    //              console.log(e.target.checked);

    //             }}/><p className="flex "> {lang}</p>
    //          </li>
    //           ))}
    //          </ul>
    //    </div>
    //    </div>
    //     {/* filter and sort */}
    //  <div className="flex flex-row">
    //   <span className="flex m-1 border h-12 w-20 p-4 justify-center items-center text-sm hover:cursor-pointer" onClick={()=>setOpen(!open)}>FILTER{open?<ArrowLeftIcon/>:<FilterListIcon/>} </span>
    //   <span className="flex m-1 border h-12 w-20 p-4 justify-center items-center text-sm hover:cursor-pointer">SORT <SortIcon/></span>
     
    //  </div>
    //  {/* search bar */}
    //  <div>
     
    //  </div>
      
    // </div>
    //  <BooksDisplay books={books}/>
    //   <Pagination totalBooks={totalBooks}  LIMIT={LIMIT}   pageArrayCalculator={pageArrayCalculator} curPage={curPage} setcurPage={setcurPage} />
    //   </div>
    <>Hello
              <ul>
              {genres.map((genre,id)=>(
             <li key={id} className="flex flex-row text-sm gap-2">
                <input type="checkbox" defaultChecked={false} value={genre} onChange={handleGenreFilter}/><p className="flex "> {genre}</p>
             </li>
              ))}
             </ul>
      {selectedGenres.map((genre , id)=>(
        <div key={id}>{genre}</div>
      )
       )}
       { console.log(2) }{console.log(selectedGenres)}
    
    
    </>
    
  )
}

export default ShopPage
