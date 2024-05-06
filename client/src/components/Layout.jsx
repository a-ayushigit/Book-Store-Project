import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className="p-4 flex flex-col min-h-screen">
        
        <Header/>
        <Outlet/>
        <Footer/>
        
    </div>
  )
}

export default Layout
