import React from 'react'
import ItemsContainer from './ItemsContainer'
import SocialIcons from './SocialIcons'

const Footer = () => {
    return (
        <footer className=" bg-slate-900 text-white dark:bg-orange-950 ">
            <div className="md:flex md:items-center md:justify-between sm:px-12 px-4 py-7  bg-cyan-950 dark:bg-red-950">
                <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal  font-semibold md:w-2/5">
                    <span className=" text-blue-300 dark:text-yellow-600">Every</span> page holds a <span  className=" text-blue-300  dark:text-yellow-600">new</span>  avenue .
                    <span className=" dark:text-yellow-600"> Enjoy our newsletter .</span> 
                </h1>
                <div>
                    <input type="text" placeholder=" Enter your email." className="text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded-2xl px-2 md:wd-auto   focus:outline-none "/>
                    <button className="bg-teal-400 hover:bg-teal-500 duration-300 px-5 py-2.5 dark:bg-red-400 dark:hover:bg-red-500 rounded-full ">Subscribe </button>
                </div>
            </div>
            <ItemsContainer/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
                <span>© Copyright 2024  . All Rights Reserved .</span>
                <span> Terms . Privacy Policy .</span>
                <SocialIcons/>
            </div>

        </footer>
    )
}

export default Footer
