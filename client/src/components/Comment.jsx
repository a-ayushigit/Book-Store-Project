import React  , {useState , useRef , useEffect, useContext} from 'react'
import Action from './Action';
import axios from "axios";
import {UserContext} from '../Contexts/UserContext'
const Comment = ({comment , handleDeleteNode , handleEditNode , handleInsertNode }) => {
    const [input, setInput] = useState("");
    const [editMode , setEditMode] = useState(false);
    const [showInput , setShowInput] = useState(false);
    const [expand , setExpand] = useState(false);
    const inputRef = useRef(null);
    const {user} = useContext(UserContext);
useEffect(()=>{
    inputRef?.current?.focus();
},[editMode])

const addComment = async() => {
    if(editMode){
      handleEditNode(comment.id , inputRef?.current?.innerText);
    //   try {
    //     const res = await axios.put(`/comments/${user._id}`, {
    //         "id":,
    //         "userId" : user._id , 
    //         "discussion" : discussionId, 
    //         "value":inputRef?.current?.innerText,
    //         "items":comment.items
    //     });
    //     console.log(res); 
    //   } catch (error) {
    //     console.log(error);
    //   }
      

    }
    else{
        setExpand(true);
        handleInsertNode(comment.id , input);
        // try {
        //     const res = await axios.post(`/comments/${user._id}`, {
        //         "userId" : user._id , 
        //         "discussion" : discussionId, 
        //         "value":input,
        //         "items":comment.items
        //     });
        //     console.log(res); 
        //   } catch (error) {
        //     console.log(error);
        //   }
        setInput("");
    }
    if(editMode) setEditMode(false);

}

const handleDelete = () => {
    handleDeleteNode(comment.id);
}
  return (
    <div className="flex flex-col gap-5 h-full  justify-center">

        {comment.id === 1 ? 
        (
            <div>
                 <input
            type="text"
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            placeholder="Type..."
            className="flex flex-grow justify-self-center h-20 focus:shadow-md m-1 max-w-[98vw]"
            />
            <Action type="COMMENT" handleclick={addComment} classname="bg-white rounded-full w-28 flex items-center justify-center p-1 m-1 border border-b-blue-950 shadow-md hover:cursor-pointer hover:shadow-xl  text-blue "/>
            </div>
           
        )
        
        :
        (
            <div className="flex flex-col gap-3 m-1 justify-center">
                <span contentEditable={editMode} ref={inputRef} suppressContentEditableWarning={editMode} className="flex self-start  h-full max-w-screen w-auto bg-white p-2 rounded-sm focus:shadow-md ">{comment.name}</span>
                <div className="flex gap-3">
                    {editMode ? <>
                        <Action type="Save" handleclick={()=>addComment()}  classname="p-2 bg-blue-950 text-white flex items-center rounded-md hover:cursor-pointer hover:shadow-md" />
                        <Action type="Cancel"  classname="p-2 bg-blue-950 text-white flex items-center rounded-md hover:cursor-pointer hover:shadow-md"  handleclick={()=>{
                            if(inputRef.current){
                                inputRef.current.innerText = comment.name;
                            }
                            setEditMode(false);
                            }}/>
                    
                    </> : 
                    <>
                     <Action type="Reply" classname="p-2 bg-blue-950 text-white flex items-center rounded-md hover:cursor-pointer hover:shadow-md" handleclick={()=>{setShowInput(true); setExpand(!expand) ; }}/>
                    <Action type="Edit" classname="p-2 bg-blue-950 text-white flex items-center rounded-md hover:cursor-pointer hover:shadow-md" handleclick={()=>setEditMode(true)}/> 
                    <Action type="Delete" classname="p-2 bg-blue-950 text-white flex items-center rounded-md hover:cursor-pointer hover:shadow-md" handleclick={()=>handleDelete()}/>
                    </>}

                   
                </div>
            </div>
        )
        }

        {/* we are recursively iterating through the comment component itself with key and the prop  */}
        <div className={`${expand ? " pl-5" : "hidden"}`}>
            {showInput &&
             <div className="flex flex-col p-2 items-start">
                <input type="text" onChange={(e)=>setInput(e.target.value)} value={input} className="flex flex-grow" placeholder="Type..."/>
                <div className="flex flex-row gap-4">
                <Action type="Reply" classname="p-2 bg-blue-950 text-white flex items-center rounded-md hover:cursor-pointer hover:shadow-md" handleclick={()=>addComment()} />
                <Action type="Cancel" classname="p-2 bg-blue-950 text-white flex items-center rounded-md hover:cursor-pointer hover:shadow-md" handleclick={()=>setShowInput(false)}/>
                </div>
             
            </div>  } 
        {
            comment?.items?.map((cmnt)=>{
                return (<Comment key={cmnt.id} comment={cmnt} handleInsertNode={handleInsertNode} handleDeleteNode={handleDeleteNode} handleEditNode={handleEditNode}/>)
            }
                
            )
         }
        </div>

    </div>
  )
}

export default Comment
