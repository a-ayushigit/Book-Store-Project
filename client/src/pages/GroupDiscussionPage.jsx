import React, { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom';
const GroupDiscussionPage = () => {
    const res = useLoaderData();
    useEffect(()=>{
     console.log(res.Groups);
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default GroupDiscussionPage
