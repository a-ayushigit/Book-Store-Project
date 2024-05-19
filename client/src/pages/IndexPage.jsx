import React from 'react'
import Header from '../components/Header'
import { Typography } from '@mui/material'
import Hero from '../components/Hero'
import BestSeller from '../components/BestSeller'
import Banner from '../components/Banner'
import TopHero from '../components/TopHero'

import Category from '../components/Category'
import BestSellers from '../components/BestSellers'

import coverImage from "../assets/coverimage.jpg";
const IndexPage = () => {
  return (
    <div className="w-full bg-cyan-100 dark:bg-red-400">
        <div className="">
            
            <TopHero/>
           
        </div>
        <div>
          <br></br>
        </div>
        <div className="top-5">
         
          <Category/>
        </div>
        <div>
          <br></br>
        </div>
        <div className="">
          <BestSellers/>
        </div>
        <div className="sm:h-[30vh]">

        </div>
        <div className="h-screen sm:h-[35vh] flex items-center sm:items-end justify-center mb-0">
        
          <img src={coverImage} className="h-[35vh]"/>
          
        </div>
        <div className="top-0">
          <Banner/>
        </div>

      
    </div>
  )
}

export default IndexPage
