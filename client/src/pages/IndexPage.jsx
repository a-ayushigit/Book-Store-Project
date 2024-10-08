import React from 'react'
import Carousel from '../components/Carousel'
import Banner from '../components/Banner'
import TopHero from '../components/TopHero'
// import {mysecret} from '../lib/paystack'
const mysecret = process.env.VITE_PAYSTACK_TEST_SECRET
console.log("my secret",mysecret)

const IndexPage = () => {
  return (
    <div className="w-full bg-cyan-100 dark:bg-red-400 grid-rows-12 relative gap-1 overflow-y-scroll no-scrollbar ">
       <TopHero className="row-span-3" />
       <Carousel className="row-span-6"/>
       <Banner className="row-span-3" />
    </div>
  )
}

export default IndexPage
