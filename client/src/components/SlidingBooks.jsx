import React from 'react'
import CardSlider from './CardSlider';
import { useState , useEffect } from 'react';
import axios from 'axios';


const SlidingBooks = ({books:books , title:title}) => {
    console.log(books);
  return (
    <div className='h-auto pb-2 '>
        <span className="flex   font-serif font-bold text-cyan-950 self-center shadow-md items-center justify-center">{title}</span>
      <CardSlider books={books} title={title}/>
    </div>
  )
  
}

export default SlidingBooks
