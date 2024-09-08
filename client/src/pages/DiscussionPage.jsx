import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { useEffect , useState } from 'react';
import CommunityNavbar from '../components/CommunityNavbar';
import Comment from '../components/Comment';
import useNode from '../components/hooks/useNode';
const DiscussionPage = () => {
    const [discussionData , setDiscussionData] = useState(null);
    const res = useLoaderData();
    const {insertNode , editNode , deleteNode} = useNode();

    const cmt = {
      id:1,
      items:[]
    }
    const [comment , setComment] = useState(cmt);
    const handleInsertNode = (folderId , item) => {
      const finalStructure = insertNode(comment , folderId , item);
      setComment(finalStructure);

    };
    
    const handleEditNode = (folderId , value) => {
          const finalStructure = editNode(comment , folderId , value);
          setComment(finalStructure);
    }

    const handleDeleteNode = (folderId) => {
      const finalStructure = deleteNode(comment , folderId);
      const temp = {...finalStructure};
      setComment(temp);
    }

    
    useEffect(()=>{
        console.log(res.Discussions);
        setDiscussionData(res.Discussions);
       }, [])
  return (
    <div className="h-full min-h-screen bg-blue-200 dark:bg-red-300">
     <CommunityNavbar/>
     <div className="flex flex-col h-auto max-h-full items-center border border-b-slate-50">
        <h1 className="flex text-4xl m-1 p-3  font-semibold ">{discussionData?.topic}</h1>
        <div>
          <p className="flex flex-row font-bold">Created By&nbsp; <span className="flex underline font-thin">{discussionData?.createdBy.fullname}</span></p>
        </div>
        <div className="flex flex-col p-2 ">
          <p className="flex flex-row flex-nowrap w-full font-bold">Content :</p>
          <p className="flex justify-self-stretch p-2 font-extralight">{discussionData?.content}</p>
        </div>
       
      </div>
      <div>
        <Comment comment={comment}  handleInsertNode={handleInsertNode} handleDeleteNode={handleDeleteNode} handleEditNode={handleEditNode}/>
      </div>
    </div>
  )
}

export default DiscussionPage
