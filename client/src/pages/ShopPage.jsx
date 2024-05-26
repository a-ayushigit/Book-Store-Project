import React, { useState, useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Card from '../components/Card';
import Pagination from '../components/Pagination';
import axios from 'axios';

const LIMIT = 9;

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
    <div className="grid grid-cols-12 h-screen relative overflow-y object-contain overflow-y-scroll" >
      <div className="col-span-3 h-screen sticky ">
        <p className="p-2">FILTER </p>
        <div className="flex justify-center">
        
        </div>
      </div>
      <div className="col-span-9 h-screen ">
        <div className="grid grid-cols-12 w-full">
          {books && books.map((book, id) => (
            <div key={id} className="h-auto grid col-span-6 md:col-span-4 sm:grid sm:col-span-6 " ><Link to={`/book/${book._id}`}><Card className="" book={book} /></Link></div>
          ))}

        </div>

        <ul className="flex decoration-transparent bottom-0 justify-center items-center" >
          {curPage !== 1 &&
            <li className="flex-auto justify-center items-center cursor-pointer" onClick={() => setcurPage(curPage - 1)}>Prev</li>
          }
          {pageArrayCalculator(totalBooks, LIMIT).map((page) => (
            <li key={page} className={`flex-auto cursor-pointer ${page === curPage ? "bg-red-200" : "bg-grey-300"} self-center justify-self-center text-center`} onClick={() => setcurPage(curPage)}>
              {page}
            </li>
          ))}
          {
            curPage !== pageArrayCalculator(totalBooks, LIMIT).length &&
            <li className="flex-auto text-justify cursor-pointer justify-center items-center" onClick={() => setcurPage(curPage + 1)}>
              Next
            </li>
          }
        </ul>

      </div>
    </div>
  )
}

export default ShopPage
