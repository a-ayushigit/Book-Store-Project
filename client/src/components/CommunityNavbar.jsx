import React from 'react'
import { Link } from 'react-router-dom'

const CommunityNavbar = () => {
    const navList = [
        {
            id:1,
            name:"Groups",
            link:"/groups"
        },
        {
            id:2,
            name:"Discussions",
            link:"/discussions"
        },
        {
            id:3,
            name:"Chat",
            link:"/chats"
        }
    ]
  return (
    <div className="w-full">
      <nav className="bg-blue-600 dark:bg-yellow-700 border text-white flex gap-2 justify-around">
     {
      navList.map((item)=>{
        return (
          <Link to={item.link} key={item.id} className="flex py-2 px-3 gap-1 text-sm hover:font-extralight  hover:text-yellow-500">{item.name}</Link>
        )
      })
     }
      </nav>
    </div>
  )
}

export default CommunityNavbar
