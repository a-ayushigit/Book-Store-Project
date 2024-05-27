import React from 'react'
import {useState , useEffect} from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [books, setBooks] = useState([]);
  const [totalBooks, setTotalBooks] = useState(0);
console.log(url);

useEffect(()=>{
    const fetchData = async()=>{
        axios.get(url).then((response)=>{
            
            setBooks(response.data.books);
            setTotalBooks(response.data.total);
            console.log(`books:${books}`);
        }).catch((err)=>console.log(err));
    }
    fetchData();
} , [url]);

return {books , totalBooks};
}

export default useFetch
