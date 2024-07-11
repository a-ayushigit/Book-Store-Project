import React from 'react'

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
    <div>
      <nav className="bg-blue-600 text-white flex gap-2">
     {
      navList.map((item)=>{
        return (
          <a href={item.link} key={item.id} className="flex py-2 px-3 gap-1 text-sm hover:font-extralight hover:text-yellow-500">{item.name}</a>
        )
      })
     }
      </nav>
    </div>
  )
}

export default CommunityNavbar
