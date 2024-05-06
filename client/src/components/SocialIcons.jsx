import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';


const SocialIcons = () => {
  return (
    <div className="">
     <span ><FacebookIcon className=" hover:text-teal-600 dark:hover:text-red-500 cursor-pointer"/></span>
     <span><LinkedInIcon className=" hover:text-teal-600 dark:hover:text-red-500 cursor-pointer"/></span>
     <span><XIcon className=" hover:text-teal-600 dark:hover:text-red-500 cursor-pointer"/></span>
     <span><InstagramIcon className=" hover:text-teal-600 dark:hover:text-red-500 cursor-pointer"/></span>
     <span><PinterestIcon className=" hover:text-teal-600 dark:hover:text-red-500 cursor-pointer"/></span>
    </div>
  )
}

export default SocialIcons
