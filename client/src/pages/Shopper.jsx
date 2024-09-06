import React, { useEffect } from 'react'
import { useState } from "react";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import Pagination from '../components/Pagination';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
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
  "Paperback", "Hardcover"
];



const Shopper = () => {
  const [curPage, setcurPage] = useState(1);

  const [open, setOpen] = useState(false);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [binding, setBinding] = useState([]);
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [searchText , setSearchText] = useState("");
  let query1 = "", query2 = "", query3 = "", query4 = "", query5 = "", query6 = "";

  let curUrl = "";

  //useEffect for query and pagination 
  useEffect(() => {
    //the variables which are modified inside the useEffect cannot be passed in the dependency array as it will cause an infinite loop

    query1 = selectedGenres.length ? `&category=${selectedGenres.join(',')}` : "";
    query2 = selectedTags.length ? `&tag=${selectedTags.join(',')}` : "";
    query3 = selectedLanguages.length ? `&lang=${selectedLanguages.join(',')}` : "";
    query4 = binding.length ? `&binding=${binding.join(',')}` : "";
    query5 = `&numericFilters=price<=${maxPrice},rating>=${rating}`;
    query6 = `title=${title}`
    //console.log(query5);


    if (!title) curUrl = `/books?page=${curPage}&limit=${LIMIT}${query1}${query2}${query3}${query4}${query5}`;
    else curUrl = `/books?title=${title}`
    setUrl(curUrl);

  }, [selectedGenres, curPage, selectedTags, selectedLanguages, binding, maxPrice, rating, title])


  //useEffect for url 

  useEffect(() => {
    // if (url) {
    //   console.log(url);
    //   axios.get(url).then((response) => {
    //     setBooks(response.data.books);
    //     setTotalBooks(response.data.total);
    //     console.log("response books ",response.data.books);
    //     console.log(response.data.total);
    //     console.log(response.data);

    //   }).catch((err) => console.log(err)).finally(
    //     console.log("state books",books)
    //   )
    // }

          console.log(url);
      axios.get(url).then((response) => {
        setBooks(response.data.books);
        setTotalBooks(response.data.total);
        console.log("response books ",response.data.books);
        console.log(response.data.total);
        console.log(response.data);

      }).catch((err) => console.log(err)).finally(
        console.log("state books",books)
      )


  }, [url])



  const handleGenreFilter = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setSelectedGenres(checked ? [...selectedGenres, value] : selectedGenres.filter((item) => item !== value));
    console.log(1);
    console.log(selectedGenres)

  }

  const handleTagFilter = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setSelectedTags(checked ? [...selectedTags, value] : selectedTags.filter((item) => item !== value));
    console.log(2);
    console.log(selectedTags)

  }

  const handleBindingFilter = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setBinding(checked ? [...binding, value] : binding.filter((item) => item !== value));
    console.log(2);
    console.log(binding)
  }

  const handleLanguagesFilter = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setSelectedLanguages(checked ? [...selectedLanguages, value] : selectedLanguages.filter((item) => item !== value));
    console.log(2);
    console.log(selectedLanguages)

  }



  return (
    <div className="dark:bg-pink-200 min-h-screen max-h-[300rem] flex h-auto max-w-h-screen no-scrollbar">
      <div className={`bg-blue-400 dark:text-yellow-100 dark:bg-red-800 ${open ? "w-[30vw] max-w-[35vw]" : "hidden w-0"} relative transform duration-900 flex-col break-words text-wrap`}>
        {/* genres */}
        <h3 className="font-serif font-bold  dark:text-white">Genre</h3>
        <ul className="sm:grid grid-cols-6">
          {genres.map((genre, id) => (
            <li key={id} className="flex flex-row text-sm gap-2 sm:col-span-3">
              <input type="checkbox" defaultChecked={false} value={genre} onChange={handleGenreFilter} /><p className="flex "> {genre}</p>
            </li>
          ))}
        </ul>
        {/* categories */}
        <h3 className="font-serif font-bold dark:text-white">Categories</h3>
        <ul className="sm:grid grid-cols-6">
          {tags.map((tag, id) => (
            <li key={id} className="flex flex-row text-sm gap-2 sm:col-span-3 justify-start">
              <div className="inline-flex ">
                <input type="checkbox" defaultChecked={false} value={tag} onChange={handleTagFilter} /><label className="flex "> {tag}</label>
              </div>
            </li>
          ))}
        </ul>
        {/* price */}
        <h3 className="font-serif font-bold dark:text-white">Price</h3>
        <div className="flex flex-row gap-3 object-contain px-2 text-wrap ">

          <span className="text-xs sm:text-sm">Rs.100</span>
          <input type="range" min={100} max={300} defaultValue={300} className="flex flex-wrap w-[12vw]" onChange={(e) => setMaxPrice(e.target.value)} />
          <span className="text-xs sm:text-sm">Rs.300</span>
          <p className="flex text-wrap text-xs sm:text-sm">Max Price:- Rs.{maxPrice}</p>
        </div>
        {/* rating */}
        <h3 className="font-serif font-bold  dark:text-white">Rating</h3>
        <div className="flex flex-row gap-3 object-contain px-2">

          <span className="text-xs sm:text-sm">0</span>
          <input type="range" min={0} max={5} defaultValue={0} className="flex flex-wrap w-[12vw]" onChange={(e) => setRating(e.target.value)} />
          <span className="text-xs sm:text-sm">5</span>
          <span className="text-wrap text-xs sm:text-sm">Rating {rating}</span>
        </div>

        {/* binding */}
        <h3 className="font-serif font-bold   dark:text-white">Binding</h3>
        <ul className="sm:grid grid-cols-6">
          {bindingItems.map((b, id) => (
            <li key={id} className="flex flex-row text-sm gap-2 sm:col-span-3 justify-start">
              <div className="inline-flex ">
                <input type="checkbox" defaultChecked={false} value={b} onChange={handleBindingFilter} /><label className="flex "> {b}</label>
              </div>
            </li>
          ))}
        </ul>
        {/* languages */}
        <h3 className="font-serif font-bold   dark:text-white">Languages</h3>
        <ul className="sm:grid grid-cols-6">
          {languages.map((lang, id) => (
            <li key={id} className="flex flex-row text-sm gap-2 sm:col-span-3 justify-start">
              <input type="checkbox" defaultChecked={false} value={lang} onChange={handleLanguagesFilter} /><p className="flex "> {lang}</p>
            </li>
          ))}
        </ul>

      </div>
      <div className={`${open ? "w-[70vw]  sm:min-w-[65vw] sm:w-[70vw]" : "w-[100vw]"}`}>
        {/* top second nav */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <span className="flex m-1 border dark:border-red-900 h-12 w-20 p-4 justify-center items-center text-sm hover:cursor-pointer" onClick={() => setOpen(!open)}>FILTER{open ? <ArrowLeftIcon /> : <FilterListIcon />} </span>
            <span className="flex m-1 border dark:border-red-900 h-12 w-20 p-4 justify-center items-center text-sm hover:cursor-pointer">SORT <SortIcon /></span>
          </div>

          {/* search bar */}
          <div className="flex flex-row items-center ">
            <input type="text" placeholder="Search any book" className="flex flex-grow w-auto text-gray-800 max-h-10" onChange={(e) =>{ 
              setTitle(e.target.value);
              setSearchText("");
              }} />
            <button className="bg-blue-100 h-9 w-9 rounded-md m-1" onClick={(e) => {
             setSearchText(title);
            }}> <SearchIcon /> </button>
          </div>
        </div>

        <div>
          {searchText && (
            <div className="flex flex-row p-2  m-1 text-blue-950"> 
             Search Results displayed for&nbsp;<span className="font-bold underline">{searchText}</span> 
            </div>
          )}
        </div>
        <BooksDisplay books={books} open={open} />
        <Pagination totalBooks={totalBooks} LIMIT={LIMIT} curPage={curPage} setcurPage={setcurPage} />
      </div>
    </div>
  )
}

export default Shopper
