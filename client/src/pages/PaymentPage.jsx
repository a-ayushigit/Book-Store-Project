import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Contexts/CartContext'
import { UserContext } from '../Contexts/UserContext';
import { optionsList } from '../constants/index';
import axios from 'axios';
const PaymentPage = () => {
    const cart = useContext(CartContext);
    const user = useContext(UserContext);
    let price = cart.getTotalCost().toFixed(2);
    let discountPrice = cart.getDiscountedPrice().toFixed(2);
    let orders = [];
    const items = cart.items;
    const booksCount = cart.items.reduce((sum, book) => sum + book.quantity, 0);
    const handlePayment = async () => {
        console.log("price ***********************************************************************", price);
        try {
            const res = await axios.post('/payments/order',
                JSON.stringify({ "amount": price - discountPrice }),
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
        catch (err) {
            console.log(err);
        }

    }

    const sendToDatabase = async (orders) => {
        let books = [];

        orders.map((order) => {
            const { _id, ...others } = order;
            books.push({ ...others, "bookId": _id });
        })
        console.log(`books `);
        console.log(user._id);
        console.log(typeof (user._id));
        console.log(user);
        console.log(typeof (user));
        console.log(books);
        console.log(orders);
        try {
            await axios.post('/orders/createOrder',
                {
                    "userId": user.user._id,
                    "books": books,
                    "amount": price - discountPrice,
                    "address": "India",
                    "status": "pending",
                }

            )

        } catch (error) {
            console.log(error)
        }


    }

    const handlePaymentVerify = async (data) => {
        console.log("************************************************************")
        console.log(JSON.stringify(import.meta.env.KEY_ID_RAZORPAY));
        console.log(typeof (JSON.stringify(import.meta.env.KEY_ID_RAZORPAY)));
        const options = {

            key: import.meta.env.KEY_ID_RAZORPAY,
            // key:key,
            amount: data.amount,
            currency: data.currency,
            name: "BookSphere",
            description: "Test Mode",
            order_id: data.id,
            handler: async (response) => {
                console.log("response", response)
                try {
                    const res = await axios.post(`/payments/verify`,
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
                        items.map((item) => {
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
    return (
        <div className="flex flex-col min-h-screen h-full">
            <div className="bg-blue-400 w-full max-h-[300rem] h-auto text-black col-span-3 border border-gray-100 p-1 ">
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


                </div>
            </div>
            <div  className="flex flex-col justify-center bg-blue-400">
                <p className="flex  font-bold p-2 justify-between">
                    Add your shipping details ....

                </p>


                <form className="grid grid-cols-6">
                    {optionsList.map((option) => (
                        <div key={option.id} className="flex flex-col col-span-6">
                            <label className="flex items-start justify-around px-2 font-bold py-1 ">{option.label}</label>
                            <input type="text" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-5 col-span-6" />
                        </div>

                    ))}

                </form>
                <div className='flex flex-row items-center justify-center col-span-6'>
                        <button  onClick={() => handlePayment()} className="bg-yellow-300 text-orange-900 p-5 my-2 rounded-lg border-orange-300 text-sm font-bold shadow-xl mx-2 hover:scale-95">Proceed to buy </button>
                    </div>


            </div>
        </div>
    )
}

export default PaymentPage
