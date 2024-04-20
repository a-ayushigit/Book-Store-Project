import { useState } from 'react'

import './App.css'
import { Route , Routes } from 'react-router-dom'
import Layout from './components/Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ShopPage from './pages/ShopPage'
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true ;
function App() {
  return (
    <>
    <Routes>
    <Route element={<Layout/>}>

    <Route index element ={<IndexPage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/shop" element={<ShopPage/>}/>

    </Route>
  </Routes>
    </>
  )
}

export default App
