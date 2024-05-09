import { useState } from 'react'
 
import './App.css'
import { Route , useLoaderData , createBrowserRouter , createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ShopPage from './pages/ShopPage'
import BookPage from './pages/BookPage'
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:5000/api/v1/books";//so that we dont have to write theentire address again and again 
axios.defaults.withCredentials = true ;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route element={<Layout/>}>

    <Route index element ={<IndexPage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/shop" element={<ShopPage/>}/>
    <Route path='/book/:id' element={<BookPage/>} loader={async ({params})=>{
    const res =  await axios.get(`http://localhost:5000/api/v1/books/${params.id}`);
    console.log(res.data);
    return res.data;
    }}/>

    </Route>
  </Route>
  )
)

function App() {
  return (
    <>
    
    <RouterProvider router={router}/>
  
    </>
  )
}

export default App
