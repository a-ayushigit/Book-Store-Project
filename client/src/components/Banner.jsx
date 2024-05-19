import React from 'react'
import image from '../assets/library.jpg' 
import SellIcon from '@mui/icons-material/Sell';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const Banner = () => {
  return (
    <div className="flex md:h-screen object-fit  bg-zinc-300 text-amber-950 dark:bg-red-400 dark:text-sky-950 ">
      <div className="grid md:grid-cols-2 grid-cols-1  ">
        <div className="col-span-1 justify-center object-contain">
            <img src={image} alt=""  className="h-[23rem] w-[35rem] p-4 rounded-3xl self-center"/>
        </div>
        <div className="col-span-1 flex-col gap-6 ">
            <div className="flex justify-center mt-10">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold m-1 sm:m-2 ">Enjoy the grand library at your fingertips </h1>
            </div>
            <div>
            <ul className="pl-1  text-slate-950 justify-center">
                <li className="mt-4"><SellIcon/> Quality Books </li>
                <li className="mt-4"><LocalShippingIcon/> Fast Delivery</li>
                <li className="mt-4"><PaymentIcon/> Easy payment method </li>
                <li className="mt-4"><CurrencyRupeeIcon/> Get Offers on Books </li>

            </ul>
            </div>
        </div>

           
      </div>
    </div>
  )
}

export default Banner
