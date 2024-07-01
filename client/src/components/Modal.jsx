import React from 'react'

const Modal = (props) => {
  console.log(props.modal);
  return (
    <div className={`${(props.modal === true) ? ' border border-gray-600 sm:h-auto min-h-[15rem]  w-auto min-w-[25rem] sm:max-h-[500vh] sm:w-[35rem] flex self-center absolute top-14 flex-shrink transition-shadow duration-500 backdrop-blur-sm bg-white/30 flex-col z-50 overscroll-contain text-xs' : 'hidden'} `}>


      <p className="flex  font-bold px-2 justify-between pt-2">
        {props.type === 'cart' ? (<>Add your shipping details .... </>) : (<>Add the Group Details ...</>)}
        <button className="flex border border-black text-white text-xs w-[2em] self-end items-center justify-center bg-red-300 mr-2 justify-self-start " onClick={() => props.setModal(!props.modal)}>X</button>
      </p>
        {props.type === 'cart' ? (<><p className='px-2 flex gap-1'><input type="checkbox" defaultChecked={true} /> Use the previous shipping details </p></>) : (<></>)}




        <form className="grid grid-cols-6" >

         {props.type === 'cart' ?(props.optionsList.map((option) => (
            <div key={option.id} className="flex flex-col col-span-6">
              <label className="flex items-start justify-around px-2 font-bold py-1 ">{option.label}</label>
              <input type="text" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-5 col-span-6" />
            </div>

          ))
        ):
          (
            props.optionsList.map((option) => (
              <div key={option.id} className="flex flex-col col-span-6">
                <label className="flex items-start justify-around px-2 font-bold py-1 ">{option.name}</label>
                <input type={option.type} className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-5 col-span-6" />
              </div>
  
            ))
          )}

        </form>
        <div className='flex flex-row items-center justify-center'>
         {props.type === 'cart' ?(
          <button onClick={props.handleSubmission} className="bg-green-900 w-40 h-10 rounded-full text-nowrap m-2 font-bold text-white">
            Confirm Shipping Address
         
         </button>
         ):
         (
          <button onClick={props.Submission} className="bg-green-900 w-40 h-10 rounded-full text-nowrap m-2 font-bold text-white">
            Confirm Group Details
            </button>
         )
         } 
        </div>

        {/* {console.log(handlePayment)} */}
      </div>
      )
}

      export default Modal
