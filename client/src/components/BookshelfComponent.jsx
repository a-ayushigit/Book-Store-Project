import React , {useContext,useState , useEffect} from 'react'
import { UserContext } from '../Contexts/UserContext';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
const BookshelfComponent = () => {
    const [bookshelfData , setBookshelfdata] = useState(null);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
  const createBookShelf = async () => {
    try {
      const date = new Date();
      const res = await axios.post(`/bookshelf`, { ownerId: user._id , type:"Users" , name: user.fullname+date});
      console.log(res.data);
      setBookshelfdata(res.data);
      if(res.data){
        alert("Now you can add books to bookshelves !!");
        navigate('/shop');
      }
      
    } catch (error) {
     console.log(error);
     alert("Error creating bookshelf:", error); 
    }
    
  }
  const getBookshelf = async() =>{
    try {
    const res = await axios.get(`/bookshelf/${user.bookshelf.id}`, {
      params: {
        ownerId: user._id,
        type: "Users"
      }
    });
    console.log(res.data);
    setBookshelfdata(res.data);
    } catch (error) {
      console.log("Error getting bookshelf:", error);
    }
    
  }

  useEffect(()=>{
     getBookshelf();
  },[])

  return (
    <div className="  h-full min-h-screen flex flex-col items-center gap-3"> 
    <p className="flex justify-center font-bold dark:text-white text-3xl text-blue-800">My Bookshelf </p>
     <button
     className={user.bookshelf?"hidden":`dark:bg-green-900 bg-blue-800 text-white border border-blue-950 p-2 rounded-lg self-center`} 
     onClick={()=>{createBookShelf()}}>
    Create Your Own Bookshelf
    </button>
     {user.bookshelf?
     <div className="grid grid-cols-12 gap-4 p-4">

        {bookshelfData?.bookshelf?.booksToRead?.map((book,i)=>
        <div key={i} className="h-full w-full rounded-md items-center justify-center col-span-6 flex flex-col dark:bg-red-950 bg-blue-300 shadow-md gap-4">
        <p className="font-bold flex justify-center items-center text-nowrap">{book.title}</p>  
        <p className="flex justify-center items-center">
          <img src={book.imageUrl} className="h-44 w-36 p-2"/>
        </p>
        </div>
        )}
    </div>:<>
     No bookshelf created !!
     </>}
    </div>
  )
}

export default BookshelfComponent
