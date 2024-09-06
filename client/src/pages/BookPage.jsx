import React, { useState, useEffect, useContext } from 'react'
import { RouterProvider, useLoaderData } from 'react-router-dom';
import Loader from './Loader';
import star from '../assets/IconImages/star-new.png'
import free from '../assets/IconImages/free_Shipping.png'
import newIcon from '../assets/IconImages/new_icon.png'
import payOn from '../assets/IconImages/pay_on.png'
import secure from '../assets/IconImages/secure_transaction.png'
import { CartContext } from '../Contexts/CartContext';
import {useNavigate} from "react-router-dom";
import ReviewComponent from '../components/ReviewComponent';
import ReviewList from '../components/ReviewList';
import { UserContext } from '../Contexts/UserContext';
import axios from 'axios';

const BookPage = () => {
  const {user} = useContext(UserContext);
  
  const [bookdetails, setBookdetails] = useState(null);
  const res = useLoaderData();
  const [loading, setLoading] = useState(true);
  const data = res.book;
  useEffect(() => {
    if (data) {
      console.log(data);
      setBookdetails(data);
      setLoading(false);
      console.log(user);

    }

  }, [])

  const cart = useContext(CartContext);
  const navigate = useNavigate();
  const addToBookshelf = async () => {
    console.log(bookdetails._id);
    console.log("my bookshelf ",user.bookshelf._id)
    try {
      const res = await axios.post(`/bookshelf/add` , {
        id:user.bookshelf?.id,
        ownerId: user._id ,
        bookId : bookdetails._id,
        type:"Users"
       } );
       console.log(res);
       navigate('/account/mycommunity');
    } catch (error) {
      
      console.log(error);
      alert("Error : book already added to the bookshelf" ,JSON.stringify(error.response.data.error));
    }

  }
  return (
    loading ?
      <Loader /> :
      <div className="min-h-screen h-full p-2 flex flex-col gap-3 overflow-hidden">
        <h1 className="text-lg sm:text-3xl font-bold">{bookdetails.title}&nbsp;({bookdetails.publishYear})</h1>
        <div className="grid grid-cols-12 ">
          <div className=" col-span-4 flex flex-col gap-2">
            <div className="shadow-xl bg-white flex flex-col h-[52vh] w-[28vw] items-center justify-center p-1 border border-blue-950 rounded-lg">
            <img src={bookdetails.imageUrl} className="h-full min-h-[50vh] w-[20vw]" />
            </div>
            <ul className="p-2 border border-blue-950 m-1 shadow-md rounded-lg">
            <li>Language : {bookdetails.language}</li>
            <li>Stock    : {bookdetails.stock}</li>
            {bookdetails.discount !== 0 ?<div>
              <li className="line-through">Old Price: Rs. {Math.ceil(bookdetails.price)}</li>
              <li>New price : Rs. <span className="font-bold">{Math.ceil((bookdetails.price) - ((bookdetails.discount)/100)*(bookdetails.price))}</span></li>
            </div>:
            <div>
            <li>Price : Rs. {Math.ceil(bookdetails.price)}</li>  
            </div>}
           
           </ul>
           <div className="flex flex-row justify-between m-1">
            <button 
            onClick={()=>{
              cart.addToCart(bookdetails);
              alert("Book added successfully!");
              console.log(cart.items);
              navigate('/cart');
            }}
            className="bg-blue-600 text-white p-2 rounded-sm m-1">Add to cart</button>
            <button className="bg-blue-600 text-white p-2 rounded-sm" onClick={()=>{addToBookshelf()}}>Add to bookshelf</button>
           </div>
         
          </div>
          
            
          
          
          <div className="flex flex-col col-span-8 items-start gap-2 h-full object-contain">
            <div className="flex flex-col  items-start">
            <div className="flex font-semibold text-xl">{bookdetails.author}</div>
            <div className="flex items-center justify-center bg-cyan-400 p-1 text-white font-semibold rounded-lg shadow-md">
              Rating - {bookdetails.rating}
              <img src={star} className="h-8 w-10"/>
            </div>
            </div>
            
            <p className="flex justify-around font-thin flex-wrap p-3 border bg-cyan-100 border-blue-950 shadow-xl rounded-md m-2">
              {bookdetails.description}
            </p>
            <div className="grid grid-cols-8 justify-between items-center w-full">
              <div className="flex flex-col col-span-2 items-center justify-center">
              <img src={free} alt="" />
              <p>Free Delivery</p>
              </div>
              <div  className="flex flex-col col-span-2 items-center justify-center">
              <img src={newIcon} alt="" />
              <p>10 days replacement</p>
              </div>
              <div  className="flex flex-col col-span-2 items-center justify-center">
              <img src={payOn} alt=""  />
              <p>Pay Later</p>
              </div>
              <div  className="flex flex-col col-span-2 items-center justify-center">
              <img src={secure} alt="" />
              <p>Secure Transaction</p>
              </div>
             
             
             
             
            </div>
          </div>
           
        </div>
        <div className="grid grid-cols-12">
            <div className="flex self-start col-span-4">
          {/* Review Component  */}
          <ReviewComponent bookId={bookdetails._id}/>
        </div>
        <div className="col-span-8 flex flex-col">
          <ReviewList bookId={bookdetails._id}/>
        </div>
        </div>
      

      </div>

  )
}

export default BookPage
