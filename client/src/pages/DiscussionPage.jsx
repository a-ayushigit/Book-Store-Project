import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';

const DiscussionPage = () => {
    const res = useLoaderData();
    useEffect(()=>{
        console.log(res.Discussions);
       }, [])
  return (
    <div>
      Single discussion page
    </div>
  )
}

export default DiscussionPage
