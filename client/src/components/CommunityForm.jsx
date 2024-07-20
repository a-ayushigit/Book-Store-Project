import React from 'react'

const GroupForm = ({handleSubmission})=>{
  return (
    <div className="backdrop-blur-xl flex flex-col w-[60vw] items-center justify-center border border-blue-950 mx-auto ">
      
      <form className="flex flex-col items-center w-full justify-center " onSubmit={handleSubmission}>
      <h2 className="flex items-center text-xl font-bold capitalize">Create your own Group</h2>
        <div className="flex flex-col col-span-6 w-full items-center p-5">
        <label className="flex items-start justify-around px-2 font-bold py-1 ">Group Name</label>
        <input type="text" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-5 col-span-6" />
        <label className="flex items-start justify-around px-2 font-bold py-1 ">Description</label>
        <textarea className="flex flex-grow w-full border my-2 py-2 px-3 max-w-[30rem] self-center justify-self-center no-scrollbar col-span-6 max-h-24 rounded-xl"/>
        <label className="flex items-start justify-around px-2 font-bold py-1 ">Rules</label>
        <textarea className="flex flex-grow w-full border my-2 py-2 px-3 max-w-[30rem] self-center justify-self-center no-scrollbar col-span-6 max-h-24 rounded-xl"/>
        <label className="flex items-start justify-around px-2 font-bold py-1 ">Group / BookClub Topic</label>
        <input type="text" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-5 col-span-6" />
        <div className="flex flex-row justify-center items-center px-auto">
        <label className="flex items-start justify-around px-2 font-bold py-1 ">Public</label>
        <input name="privacy" type="radio" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-5 col-span-3" />
        <label className="flex items-start justify-around px-2 font-bold py-1 ">Private</label>
        <input name="privacy" type="radio" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-5 col-span-3" />
        </div>
        
        <button type="submit"   className="bg-green-900 w-40 h-10 flex items-center text-xs sm:text-sm justify-center rounded-xl text-nowrap m-2 font-bold text-white">
            Confirm Group Details
            </button>
        </div>
        
      </form>
    </div>
  )
}

const CommunityForm = ({group , discussion , optionsList , handleSubmission}) => {
  return (
    <div className="flex h-screen w-screen ">
      {group && <GroupForm handleSubmission={handleSubmission}/>}
      {discussion && <DiscussionForm handleSubmission={handleSubmission}/>}
    </div>
  )
}

const DiscussionForm = ({handleSubmission})=>{
 return ( <div className="backdrop-blur-xl flex flex-col w-[60vw] items-center justify-center border border-blue-950 mx-auto ">
      
 <form className="flex flex-col items-center w-full justify-center " onSubmit={handleSubmission}>
 <h2 className="flex items-center text-xl font-bold ">Start a Discussion</h2>
   <div className="flex flex-col col-span-6 w-full items-center p-5">
   <label className="flex items-start justify-around px-2 font-bold py-1 ">Topic</label>
   <input type="text" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-5 col-span-6" />
   <label className="flex items-start justify-around px-2 font-bold py-1 ">Content</label>
   <textarea className="flex flex-grow w-full border my-2 py-2 px-3 max-w-[30rem] self-center justify-self-center no-scrollbar col-span-6 max-h-40 rounded-xl"/>
   
   <label className="flex items-start justify-around px-2 font-bold py-1 ">Book (if any)</label>
   <input type="text" className="flex flex-grow w-full max-w-[30rem] max-h-7 self-center justify-self-center px-5 col-span-6" />
   
   
   <button type="submit"   className="bg-green-900 w-40 h-10 flex items-center text-xs sm:text-sm justify-center rounded-xl text-nowrap m-2 font-bold text-white">
       Post
       </button>
   </div>
   
 </form>
</div>)
}

export default CommunityForm
