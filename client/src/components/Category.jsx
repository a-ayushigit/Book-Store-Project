import React from 'react'
import { useState , useEffect } from 'react';
import axios from 'axios';
import Book from './Book';
import Slider from './Slider';
import CategoryList from './CategoryList';

const Category = () => {

   

  return (
    <div className="h-screen sm:h-full bg-cyan-300">
   <div className="grid-cols-1">
    <CategoryList/>
   </div>
     
    </div>
  )
}

export default Category
