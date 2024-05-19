import React from 'react'

const ShopPage = () => {
  return (
    <div className="grid grid-cols-12 no-scrollbar">
      <div className="col-span-3 h-screen border border-r-black">
      <p className="p-2">FILTER </p> 
      <div className="flex justify-center">
      <select name="" id="" type=" checkbox">
      <ul className=" flex flex-col flex-wrap items-center justify-evenly ">
        <li>FICTION</li>
        <li>NON - FICTION</li>
        <li>ADVENTURE</li>
        <li>CHILDREN</li>
        <li>MEMOIR</li>
      </ul>
      </select>
      </div>
      </div>
      <div className="col-span-9 h-screen">
     Main
      </div>
    </div>
  )
}

export default ShopPage
