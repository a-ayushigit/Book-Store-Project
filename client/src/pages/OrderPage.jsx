import React from 'react'

const OrderPage = ({orders}) => {
   
    console.log(orders.data.Orders);
    const orderedItems = orders.data.Orders;


  return (
    <div className="grid grid-cols-12">
        <div className="col-span-9">
            <ul>
            {orderedItems.map((item)=>(
              <li key={item._id}>
                 <div className=" w-full h-[15rem] border border-black grid grid-cols-12">
                      <div className="flex items-center justify-center w-auto col-span-12 sm:col-span-3">
                        <img src={item.imageUrl} alt="" className="sm:h-[12rem] w-auto h-auto" />
                      </div>
                      <div className="flex flex-col w-auto col-span-12 sm:col-span-9">
                         <p className="flex flex-row justify-start pt-8 sm:text-2xl font-bold font-serif">{item.title}</p>

                        <p className="flex flex-row justify-start ">by {item.author}</p>
                        <p className="flex flex-row justify-start ">Rs. {item.price}</p>
                        <br />
                       

                      </div>

                    </div>
              </li>

            ))}
            </ul>
            
        </div>
        <div className="col-span-3">

            
        </div>
      
    </div>
  )
}

export default OrderPage
