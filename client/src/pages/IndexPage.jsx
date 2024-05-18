import React from 'react'
import Header from '../components/Header'
import { Typography } from '@mui/material'
import Hero from '../components/Hero'
import BestSeller from '../components/BestSeller'
import Banner from '../components/Banner'
import TopHero from '../components/TopHero'
import HeroSlider from '../components/HeroSlider'

const IndexPage = () => {
  return (
    <div className="w-full">
        <div className="w-full">
            {/* <Hero/> */}
            <TopHero/>
            {/* <HeroSlider/> */}
        </div>
        <div>
          <BestSeller/>
        </div>
        <div>
          <Banner/>
        </div>

      
    </div>
  )
}

export default IndexPage
