import React from 'react'

const monthMap = {
  1:"January" ,
  2:"February",
  3:"March" ,
  4:"April" ,
  5:"May" ,
  6:"June" ,
  7:"July" ,
  8:"August" ,
  9:"September" ,
  10:"October" ,
  11:"November" ,
  12:"December" ,
}

const OrderPage = ({orders}) => {
   
    console.log(orders?.data?.Orders);
    const orderedItems = orders?.data?.Orders;
    console.log("orderedItems");
    console.log(orderedItems);


  return (
    <div className="grid grid-cols-12">
        <div className="col-span-9">
          {
           orderedItems && orderedItems.map((item)=>(
              <div key={item._id}>
            <h2>{
        (`${monthMap[new Date(item.createdAt).getMonth()]} ${new Date(item.createdAt).getDate()} , ${new Date(item.createdAt).getFullYear()} `)
            }</h2>
            <div>
              {item.books.map((book)=>(
               <p>{book.title}</p> 
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
