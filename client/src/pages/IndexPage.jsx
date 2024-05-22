import React from 'react'



import Carousel from '../components/Carousel'
import Banner from '../components/Banner'
import TopHero from '../components/TopHero'
import BestSellers from "../components/BestSellers"
import Category from '../components/Category'



const IndexPage = () => {
  return (
    <div className="w-full bg-cyan-100 dark:bg-red-400 grid-rows-12 relative gap-1">
       <TopHero className="row-span-3" />
       {/* <Category className="row-span-3" />
       <BestSellers className="row-span-3" /> */}
        
        <Carousel className="row-span-6"/>
        <Banner className="row-span-3" />
    </div>
  )
}

export default IndexPage
