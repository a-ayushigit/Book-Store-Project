import React , {useEffect , useState} from 'react'
import axios from 'axios'
const AdminPage = () => {
  const [stats , setStats] = useState([]);
    useEffect(()=>{
        const fetchData = async() => {
            try {
              const data = await axios.get('/userAdmin/stats' );
              console.log(data);
              setStats(data);
            } catch (error) {
              console.log(error);
            }
        }
        fetchData();
    },[])

    const getMonthName = (monthNum) =>{
      const date = new Date();
      date.setMonth(monthNum - 1);
      return date.toLocaleString('default' , {month : 'long'});

    }
   
  return (
    <div>
      This is the admin page .
      <p>
       {stats && 
       <div>
        {stats.data && stats.data.map((item , i)=>
        <div key={i}>
          Users created in the month {getMonthName(item._id)} : {item.total}
        </div>
        )}
       </div>}
      </p>
    </div>
  )
}

export default AdminPage
