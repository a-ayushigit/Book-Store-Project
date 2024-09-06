import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Contexts/CartContext'
import { UserContext } from '../Contexts/UserContext';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import dotenv from 'dotenv'
import { useNavigate } from 'react-router-dom';
import library from '../assets/books-6344402_1280.png'
import Modal from '../components/Modal';
import LoginToContinuePage from './LoginToContinuePage';

//dotenv.config()
const CartPage = () => {
  console.log(import.meta.env.KEY_ID_PAYSTACK_TEST_SECRET);
  const cart = useContext(CartContext);
  const user = useContext(UserContext);
  const booksCount = cart.items.reduce((sum, book) => sum + book.quantity, 0);
  const items = cart.items;
  const navigate = useNavigate();
 
  

  const [modal , setModal] = useState(false);

  
  console.log(cart);
  console.log(user);


  
  //  console.log(handlePayment)
  return (<div className=" flex flex-col flex-grow overflow-y-scroll no-scrollbar ">
   {/* <Modal modal={modal} handlePayment={handlePayment} setModal={setModal} optionsList={optionsList} 
     /> */}
   {/* {console.log(handlePayment)} */}
    <div className="dark:bg-red-400 bg-cyan-700 h-screen text-white">
      
      {user.user ?

        (<div className="flex flex-grow flex-col">
        <h1 className="flex justify-center items-center">CART ITEMS</h1>
        <div className="dark:bg-red-400 bg-gradient-to-r from-sky-300 to-indigo-300">
          <p className="text-xl flex items-center justify-center">Hello {user.user.username}</p>
          <p className=" flex items-center justify-center">You have {booksCount} books in your cart </p>
          <div className="grid grid-cols-12  relative">
            <div className="flex flex-grow bg-gradient-to-r from-cyan-200 to-blue-500 dark:bg-red-300 w-full max-h-full h-full min-h-screen col-span-9">
              <ul className="decoration-none flex flex-grow flex-col gap-1 p-1 h-full overflow-y-auto">
                {(items.map((item) =>
                  <li key={item._id}>
                    <div className=" w-full h-[15rem] border border-black grid grid-cols-12">
                      <div className="flex items-center justify-center w-auto col-span-12 sm:col-span-3">
                        <img src={item.imageUrl} alt="" className="sm:h-[12rem] w-auto h-auto" />
                      </div>
                      <div className="flex flex-col w-auto col-span-12 sm:col-span-9">
                        <div className="flex flex-row justify-end p-1"><CloseIcon className="top-0 rounded border  border-black p-1 bg-red-700 cursor-pointer " onClick={() => cart.removeAllBooks(item._id)} /></div>
                        <p className="flex flex-row justify-start pt-8 sm:text-2xl font-bold font-serif">{item.title}

                        </p>

                        <p className="flex flex-row justify-start ">by {item.author}</p>
                        <p className="flex flex-row justify-start ">Rs. {item.price}</p>
                        <br />
                        <div className="flex flex-row ">
                          <div className="flex flex-row text-black justify-start">Quantity : <p className="px-2 h-8 flex flex-row gap-1 text-center"><AddIcon className=" flex self-center place-self-center border border-black p-1 rounded h-8 cursor-pointer" onClick={() => cart.addToCart(item)} /> <input className=" h-8 w-8 flex  px-1  place-items-center justify-items-center rounded " type="number" readOnly value={item.quantity} />
                            <RemoveIcon className=" flex self-center place-self-center border border-black p-1 rounded h-8 cursor-pointer" onClick={() => cart.removeOneBook(item)} />
                          </p></div>

                        </div>

                      </div>

                    </div>


                  </li>
                ))
                }
              </ul>
             
            </div>
            <div onClick={()=>navigate("/payment")} className="flex h-16 w-full  justify-center col-span-3">
            <button className="bg-green-800 w-36 border border-blue-950 h-16 text-white rounded-sm text-nowrap p-2">Proceed to pay </button>
           </div>
          
          </div>
         
        </div>
        </div>)
        : (<><LoginToContinuePage/></>)}
    </div>
    </div>)
}

export default CartPage
