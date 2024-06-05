import React from 'react'

const Modal = (props) => {
    console.log(props.modal);
  return (
    <div className={`${(props.modal === true)?' border border-gray-600 sm:h-auto min-h-[15rem]  w-auto min-w-[25rem] sm:max-h-[500vh] sm:w-[35rem] flex self-center absolute top-14 flex-shrink transition-shadow duration-500 backdrop-blur-sm bg-white/30 flex-col z-50 overscroll-contain text-xs':'hidden'} `}>
      <p className="flex  font-bold px-2 justify-between pt-2">Add your shipping details .... 
      <button className="flex border border-black text-white text-xs w-[2em] self-end items-center justify-center bg-red-300 mr-2 justify-self-start " onClick={()=>props.setModal(!props.modal)}>X</button>
      </p>
      <p className='px-2 flex gap-1'><input type="checkbox" defaultChecked={true} /> Use the previous shipping details </p>
      
      <form className="grid grid-cols-6" >
        <label className="flex px-2 font-bold py-1 col-span-6">Country/Region</label>
        <input type="text" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-auto col-span-6" />
        <label className="flex px-2 font-bold py-1 col-span-6">Full Name</label>
        <input type="text" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-auto col-span-6" />
        <label className="flex px-2 font-bold py-1 col-span-6">Mobile Number</label>
        <input type="number" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-auto col-span-6" />
        <label className="flex px-2 font-bold py-1 col-span-6">Pincode</label>
        <input type="number" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-auto col-span-6" />
        <label className="flex px-2 font-bold py-1 col-span-6">Flat, House no., Building, Company, Apartment</label>
        <input type="text" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-auto col-span-6" />
        <label className="flex px-2 font-bold py-1 col-span-6">Area, Street, Sector, Village</label>
        <input type="text" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-auto col-span-6" />
        <label className="flex px-2 font-bold py-1 col-span-6">Landmark</label>
        <input type="text" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-auto col-span-6" />
        <div className="flex flex-row px-3 flex-grow col-span-6 gap-3">

        <label className="flex px-1 font-bold py-1 col-span-3 items-center justify-center">Town/City</label>
        <input type="text" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-auto col-span-3" />
        <label className="flex px-1 font-bold py-1 col-span-3 items-center justify-center ">State</label>
        <input type="text" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-auto col-span-3" />
        </div>

      </form>
      <div className='flex flex-row items-center justify-center'>
      <button onClick={props.handlePayment}  className="bg-green-900 w-40 h-10 rounded-full text-nowrap m-2 font-bold text-white">Confirm Shipping Address </button>
      </div>
     
      {/* {console.log(handlePayment)} */}
    </div>
  )
}

export default Modal
