import React, { useState, useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import axios from 'axios';

const LIMIT = 10;

const ShopPage = () => {
  const [curPage, setcurPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/books?page=${curPage}&limit=${LIMIT}`).then((response) => {
      setBooks(response.data.books);

      setTotalBooks(response.data.total);
      console.log(books);
      console.log(totalBooks);
    }).catch((error) => { console.log(error) })
  }, [curPage]);

  function pageArrayCalculator(totalBooks, LIMIT) {
    let pages = [];
    const final = Math.ceil(((totalBooks)) / LIMIT);
    console.log(final);
    for (let i = 1; i <= final; i++) {
      pages.push(i);
    }

    return pages;
  }

  return (
    <div className="m-2 p-2" >
     <div className="grid grid-cols-12 ">
          {books && books.map((book, id) => (
            <div key={id} className=" size-auto grid col-span-6  p-2 m-4 my-8 border hover:shadow-2xl" ><Link to={`/book/${book._id}`}><Card className="" book={book} /></Link></div>
          ))}
      </div>
      <div className="">
         <ul className="flex decoration-transparent  justify-center items-center " >
          {
            <li className={`flex-auto shrink justify-center items-center cursor-pointer `} onClick={() => curPage !== 1? setcurPage(curPage - 1):setcurPage(curPage)}><div className="flex w-28 justify-evenly">Prev</div></li> 
            
          }
          {pageArrayCalculator(totalBooks, LIMIT).map((page) => (
            <li key={page} className={`flex-auto shrink cursor-pointer ${page === curPage ? "bg-red-200" : "bg-grey-300"} self-center  rounded-full justify-evenly h-6 w-12  text-center`} onClick={() => setcurPage(page)}>
              {page}
            </li>
          ))}
          {
            <li className="flex-auto shrink cursor-pointer justify-center items-center" onClick={() =>curPage !== pageArrayCalculator(totalBooks, LIMIT).length? setcurPage(curPage + 1):setcurPage(curPage)}>
              <div className="flex w-28 justify-evenly">Next</div>
            </li>
          }
        </ul>
        </div>
      </div>
    
  )
}

export default ShopPage
