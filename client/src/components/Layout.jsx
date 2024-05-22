import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen p-1">
        
        <Header className=""/>
        <Outlet className=""/>
        <Footer className=""/>
        
    </div>
  )
}

export default Layout
