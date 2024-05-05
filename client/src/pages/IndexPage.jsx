import React from 'react'
import Header from '../components/Header'
import { Typography } from '@mui/material'
import Hero from '../components/Hero'
import BestSeller from '../components/BestSeller'
import Banner from '../components/Banner'

const IndexPage = () => {
  return (
    <div className="  w-full">
        <div className=" w-full ">
            <Hero/>
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
