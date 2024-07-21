import React, { useContext, useState } from 'react'
import { UserContext } from '../Contexts/UserContext'
const monthMap = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
}

const OrderPage = ({ orders }) => {

  console.log(orders?.data?.Orders);
  const orderedItems = orders?.data?.Orders;
  console.log("orderedItems");
  console.log(orderedItems);
  const {user , setUser} = useContext(UserContext);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-9">
        {
          orderedItems && orderedItems.map((item) => (
            <div key={item._id}>
              <h2>{
                (`${monthMap[new Date(item.createdAt).getMonth()]} ${new Date(item.createdAt).getDate()} , ${new Date(item.createdAt).getFullYear()} `)
              }</h2>
              <div className="flex flex-col gap-1 py-1">
                {item.books.map((book) => (
                  <div className=" w-full h-[15rem] border border-black grid grid-cols-12">
                    <div className="flex items-center justify-center w-auto col-span-12 sm:col-span-3">
                      <img src={book.imageUrl} alt="" className="sm:h-[12rem] w-auto h-auto" />
                    </div>
                    <div className="flex flex-col w-auto col-span-12 sm:col-span-9">

                      <p className="flex flex-row justify-start pt-8 sm:text-2xl font-bold font-serif">{book.title}

                      </p>

                      <p className="flex flex-row justify-start ">by {book.author}</p>
                      <p className="flex flex-row justify-start ">Rs. {book.price}</p>
                      <br />
                      <p>Quantity : {book.quantity}</p>
                      <p className = "capitalize ">Status    :{item.status}</p>
                      {console.log("books")}
                      {console.log(book)}

                    </div>

                  </div>
                ))}
              </div>


            </div>
          ))
        }

      </div>
      <div className="col-span-3">

        
      </div>

    </div>
  )
}

export default OrderPage
