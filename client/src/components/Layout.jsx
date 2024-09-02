import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className=" ">
        
        <Header className=" "/>
        
        
       
        
        <Outlet className=" h-full "/>
        
        
       
        <Footer className=""/>
       
        
       
        
        
    </div>
  )
}

export default Layout
