import React, { useState } from 'react'
import { useEffect, useContext } from 'react'
import axios from 'axios'
import { UserContext } from '../Contexts/UserContext';
import CommunityNavbar from '../components/CommunityNavbar'
import { Link } from 'react-router-dom';

const DiscussionsPage = () => {
  const [discussions, setDiscussions] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const getDiscussions = async () => {
    try {
      const res = await axios.get('/discussions');
      console.log(res.data);
      setDiscussions(res.data);
    }
    catch (err) {
      console.log(err);

    }

  }
  
  useEffect(() => {

    getDiscussions();
  }, [])
  return (
    <div className="flex h-screen flex-col overflow-x-hidden">
      <CommunityNavbar />
      <h1 className="flex font-bold text-4xl font-serif justify-center">DISCUSSIONS</h1>
      <div className="grid grid-cols-12 gap-4 p-3">
        {discussions.map((discussion, i) => (
          <div key={i} className="flex  flex-row sm:col-span-6 col-span-12 hover:cursor-pointer">
            <div className="flex flex-col h-full w-full  bg-indigo-200 p-4 border-blue-500 border shadow-sm shadow-pink-800 ">
              <h1 className="text-xl font-bold ">{discussion.topic}</h1>
              <p className="flex truncate max-h-20">{discussion.content.substring(0 , 100) + '...'}</p>
              <div className="flex flex-row gap-5 p-1 justify-between items-center ">
                
                <Link to={`/${discussion.group?'groups/'+discussion.group:"individual"}/discussions/${discussion._id}`} className='flex underline font-semibold'>View Discussion </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
      )
}

      export default DiscussionsPage
