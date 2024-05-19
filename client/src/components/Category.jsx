import React from 'react'
import { useState , useEffect } from 'react';
import axios from 'axios';
import Book from './Book';
import Slider from './Slider';
import CategoryList from './CategoryList';

const Category = () => {

   

  return (
    <div className="h-screen flex object-contain gap-1 sm:h-full dark:bg-red-800 bg-cyan-100 items-center justify-center">
   <div className="grid-cols-1">
    <span className=' font-serif shadow-md uppercase font-bold dark:text-black flex items-center justify-center'> Categories  </span>
    <CategoryList/>
   </div>
     
    </div>
  )
}

export default Category
