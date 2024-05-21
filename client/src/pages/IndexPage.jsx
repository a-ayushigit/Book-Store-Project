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
    <div className="w-full bg-cyan-100 dark:bg-red-400 grid-rows-12 relative gap-1">
       <TopHero className="row-span-3" />
       <Category className="row-span-3" />
       <BestSellers className="row-span-3" />
       {/* <img src={coverImage} className="h-[100%] pt-5"/> */}
       <Banner className="row-span-3" />
    </div>
  )
}

export default IndexPage
