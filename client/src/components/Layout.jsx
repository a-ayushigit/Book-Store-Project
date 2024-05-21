import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className="p-4 grid  min-h-screen ">
        
        <Header className="h-auto"/>
        <Outlet className="h-auto"/>
        <Footer className="h-auto mb-0"/>
        
    </div>
  )
}

export default Layout
