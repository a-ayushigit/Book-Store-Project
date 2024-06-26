import React from 'react'

const Item = ({Links , title}) => {
  return (
    <ul>
      <h1 className="mb-1 font-semibold">{title}</h1>
      {
        Links.map((link)=>(
            <li key={link.name}>
                <a className="text-gray-400 hover:text-teal-400 dark:hover:text-yellow-300" href={link.link}>{link.name}</a>
            </li>
        ))
      }
    </ul>
  )
}

export default Item
