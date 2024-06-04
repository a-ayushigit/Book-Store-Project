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

//dotenv.config()
const CartPage = () => {

  const cart = useContext(CartContext);
  const user = useContext(UserContext);
  const booksCount = cart.items.reduce((sum, book) => sum + book.quantity, 0);
  const items = cart.items;
  const navigate = useNavigate();
  let price = cart.getTotalCost().toFixed(2) ;
  let discountPrice = cart.getDiscountedPrice().toFixed(2) ;
  let orders = [];

  const [modal , setModal] = useState(false);

  
  console.log(cart);
  console.log(user);


  const handlePayment = async() =>{
    console.log(price);
    try{
      const res = await axios.post('http://localhost:5000/api/v1/payments/order' , 
          JSON.stringify({"amount" : price - discountPrice}) , 
          {
            headers: {
            "content-type": "application/json"
        }
      }
      )
      const data = res.data;
      console.log(data);
      handlePaymentVerify(data.data);
    }
    catch(err){
      console.log(err);
    }

  }

  const sendToDatabase = async(orders) =>{
      let books = [];
     
      orders.map((order)=>{
        const { _id ,...others } = order;
        books.push({...others ,"bookId":_id}  );
      })
      console.log(`books `);
      console.log(user._id);
      console.log(typeof(user._id));
      console.log(user);
      console.log(typeof(user));
      console.log(books);
      console.log(orders);
      try {
        await axios.post('http://localhost:5000/api/v1/orders/createOrder',
          {
            "userId":user.user._id, 
            "books":books,
            "amount":price-discountPrice,
             "address":"India",
            }

        )
        
      } catch (error) {
        console.log(error)
      }


  }

  const handlePaymentVerify = async(data) =>{
    console.log(JSON.stringify(import.meta.env.KEY_ID_RAZORPAY));
    console.log(typeof(JSON.stringify(import.meta.env.KEY_ID_RAZORPAY)));
    const options = {

      key: import.meta.env.KEY_ID_RAZORPAY,
      amount: data.amount,
      currency: data.currency,
      name: "BookSphere",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
          console.log("response", response)
          try {
              const res = await axios.post(`http://localhost:5000/api/v1/payments/verify`, 
                JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
              }),
                 {
                  headers: {
                    'content-type': 'application/json'
                }
                 }
                 
              )

              // const verifyData =  res;
              // console.log(verifyData);

              if (res.data.message) {
                 console.log(res.data.message);
                 items.map((item)=>{
                  orders.push(item);
                  cart.removeAllBooks(item._id);
                 })
                 sendToDatabase(orders)

              }
          } catch (error) {
              console.log(error);
          }
      },
      theme: {
          color: "#5f63b8"
      }
  };
  const rzp1 = new window.Razorpay(options);
  rzp1.open();

  }

  return (<>
   <Modal modal={modal} handlePayment={handlePayment}
     />
   {console.log(handlePayment)}
    <div className="dark:bg-red-400 bg-blue-200 ">
      <h1 className="sm:text-lg font-bold flex px-4">CART ITEMS</h1>
      {user.user ?
        (<div className="dark:bg-red-400 bg-gradient-to-r from-sky-300 to-indigo-300">
          <p className="text-xl flex items-center justify-center">Hello {user.user.username}</p>
          <p className=" flex items-center justify-center">You have {booksCount} books in your cart </p>
          <div className="grid grid-cols-12">
            <div className=" bg-gradient-to-r from-cyan-200 to-blue-500 dark:bg-red-300 w-full max-h-[300rem] h-auto min-h-screen col-span-9">
              <ul className="decoration-none flex flex-col gap-1 p-1">
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
                          <div className="flex flex-row justify-start">Quantity : <p className="px-2 h-8 flex flex-row gap-1 text-center"><AddIcon className=" flex self-center place-self-center border border-black p-1 rounded h-8 cursor-pointer" onClick={() => cart.addToCart(item)} /> <input className=" h-8 w-8 flex  px-1  place-items-center justify-items-center rounded " type="number" readOnly value={item.quantity} />
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
            <div className="bg-blue-400 w-full max-h-[300rem] h-auto min-h-screen col-span-3 border border-gray-100 p-1">
              <p className="text-lg flex justify-center font-semibold">  ORDER SUMMARY </p>
              <div className="border-full border-gray-200  flex flex-col  m-1 bg-gray-50 ">
                <p className="pl-3 py-1"> PRICE DETAILS</p>
                <hr />

                <div className="grid grid-cols-12">
                  <div className='flex flex-row justify-start text-xs col-span-6 pl-3'>Price({booksCount} items)</div>
                  <div className='flex flex-row justify-end text-xs col-span-6 pr-2 font-bold'>Rs.{price}</div>
                  <div className='flex flex-row justify-start text-xs col-span-6 pl-3'>Discount  </div>
                  <div className='flex flex-row justify-end text-xs col-span-6 pr-2 font-bold'>Rs . {discountPrice}</div>
                  <div className='flex flex-row justify-start text-xs col-span-6 pl-3'>Delivery charges  </div>
                  <div className='flex flex-row justify-end text-xs col-span-6 pr-2 font-bold'>Free</div>
                 
                  <div className="flex py-3 justify-between col-span-12 ">
                  
                    <div className='flex flex-row justify-start text-xs col-span-6 pl-3 text-nowrap'>Total Charges  </div>
                    <div className='flex flex-row justify-between text-xs col-span-6  font-bold whitespace-nowrap'>Rs.{(price - discountPrice).toFixed(2)}</div>
                    <hr />
                    
                  </div>
                <p className="flex flex-row col-span-12 items-center text-xs justify-center text-green-800 font-semibold">You will save Rs. {discountPrice} on this order  </p>

                </div>
                <button className="bg-yellow-300 text-orange-900 py-1 my-2 border-orange-300 text-xs font-bold shadow-xl mx-2 "
                onClick={()=>{

                  setModal(!modal);
                  
                }}
                >Proceed to Buy </button>
              </div>
            </div>
           
          </div>
          
        </div>
        )
        : (<p>Please login to view your cart Items</p>)}
    </div>
    </>)
}

export default CartPage
