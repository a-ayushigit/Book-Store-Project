import React from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../Contexts/UserContext'
import {useNavigate} from 'react-router-dom'
const CreateDiscussion = ({groupId}) =>{
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmission = async (ev) => {
    ev.preventDefault();
    try {
      console.log(typeof (Number(user._id)));
      await axios.post('/discussions/createDiscussion',
        {
          topic: ev.target[0].value,
          content: ev.target[1].value,
          createdBy: user._id,
          group: groupId
  
        }
  
      )
      alert('Discussion created successfully!');
      navigate(`/groups/${groupId}/groupDiscussions`);
    }
    catch (error) {
      console.log(error);
      alert(`${error.message} - Error creating discussion`);
    }
  }
return (

  <form className="flex flex-col items-center w-full border border-red-950 justify-center dark:bg-red-300 bg-blue-100" onSubmit={handleSubmission}>
    <h2 className="flex items-center text-xl font-bold ">Start a Discussion</h2>
    <div className="flex flex-col col-span-6 w-full items-center p-5">
      <label className="flex items-start justify-around px-2 font-bold py-1 ">Topic</label>
      <input type="text" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-5 col-span-6" />
      <label className="flex items-start justify-around px-2 font-bold py-1 ">Content</label>
      <textarea className="flex flex-grow w-full border my-2 py-2 px-3 max-w-[30rem] self-center justify-self-center no-scrollbar col-span-6 max-h-40 rounded-xl" />

      <label className="flex items-start justify-around px-2 font-bold py-1 ">Book (if any)</label>
      <input type="text" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-5 col-span-6" />


      <button type="submit" className="bg-green-900 w-40 h-10 flex items-center text-xs sm:text-sm justify-center rounded-xl text-nowrap m-2 font-bold text-white">
        Post
      </button>
    </div>

  </form>

)

}
export default CreateDiscussion
