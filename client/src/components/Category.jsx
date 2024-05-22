import React from 'react'



import CategoryList from './CategoryList';

const Category = () => {

   

  return (
    <div className="h-full flex object-contain gap-1 p-2 dark:bg-red-800 bg-cyan-100 items-center justify-center">
   <div className="grid-cols-1">
    <span className='font-serif shadow-md uppercase font-bold text-cyan-950 dark:text-black flex items-center justify-center'> Categories  </span>
    <CategoryList/>
   </div>
     
    </div>
  )
}

export default Category
