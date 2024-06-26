import { useState } from 'react'
 
import './App.css'
import { Route , useLoaderData , createBrowserRouter , createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import CartPage from './pages/CartPage.jsx'
import BookPage from './pages/BookPage'
import AccountPage from './pages/AccountPage'
import axios from 'axios';
import UserContextProvider from './Contexts/UserContext.jsx'
import Shopper from './pages/Shopper.jsx'
import Community from './pages/Community.jsx'
import DiscussionsPage from './pages/DiscussionsPage.jsx'
import GroupPage from './pages/GroupsPage.jsx'
axios.defaults.baseURL = "http://localhost:5000/api/v1/";//so that we dont have to write theentire address again and again 
axios.defaults.withCredentials = true ;

const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route>
    <Route element={<Layout/>}>

    <Route index path="/" element ={<IndexPage/>}/>
    <Route path="login" element={<LoginPage/>}/>
    <Route path="register" element={<RegisterPage/>}/>
    <Route path="shop" element={<Shopper/>}/>
    <Route path="account" element={<AccountPage/>}/>
    <Route path="cart" element={<CartPage/>}/>
    <Route path="account/:subpage" element={<AccountPage/>}/>
    <Route path="community" element={<Community/>}/>

    <Route path='book/:id' element={<BookPage/>} loader={async ({params})=>{
    const res =  await axios.get(`http://localhost:5000/api/v1/books/${params.id}`);
    console.log(res.data);
    return res.data;
    }}/>
    <Route path="discussions" element={<DiscussionsPage/>}/>
    <Route path="groups" element={<GroupPage/>}/>
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
