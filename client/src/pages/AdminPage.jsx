import React , {useEffect , useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
const AdminPage = () => {
  const [stats , setStats] = useState([]);
  const [income , setIncome] = useState(null);
  const [orders , setOrders] = useState([]);
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
        const fetchIncome = async() =>{
          try {
            const data = await axios.get('/orders/income');
            console.log("income",data);
            setIncome(data.data[0].total);
          } catch (error) {
            console.log(error);
          }
        }

        const getAllOrders = async() =>{
          try {
            const data = await axios.get('/orders');
            console.log(data); 
            setOrders(data.data);
            console.log(orders)
          } catch (error) {
            console.log(error);
          }
        }
        fetchData();
        fetchIncome();
        getAllOrders();
    },[])

    const getMonthName = (monthNum) =>{
      const date = new Date();
      date.setMonth(monthNum - 1);
      return date.toLocaleString('default' , {month : 'long'});

    }
   
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="bg-blue-500 text-white h-12 flex items-center justify-end p-2">
      <Link to='/login'>Go to Login </Link> 
      </div>   
      <div className="flex flex-row">
      {/* <section className="bg-purple-500 h-screen w-[30vw]">
      section
     </section> */}
     <div className="flex flex-col">
     <div className="flex flex-col p-2">
        <p className="text-lg font-bold flex p-2">User Data</p>
       {stats && 
       <div>
        {stats.data && stats.data.map((item , i)=>
        <div key={i}>
          Users created in the month {getMonthName(item._id)} : {item.total}
        </div>
        )}
       </div>}
      </div>
      <div className="p-2 flex flex-col">
        <p className="text-lg font-bold flex p-2">Income data  </p>
        <p>
        Total income : Rs.{Math.ceil(income)}
        </p>
      </div>
      <div>
        <p className="text-lg font-bold flex p-2">Orders Data </p>
        <table className="min-w-full table-auto border-collapse border border-gray-200 m-1">
          
            <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">S.No.</th>
            <th className="border border-gray-300 px-4 py-2 text-left" >Address</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">User Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Purchases</th>
            </tr>
            
              {orders  && orders.map((order , i)=>(
                <tr key={i}>
                <td className="border border-gray-300 px-4 py-2">{i+1}</td>
                <td className="border border-gray-300 px-4 py-2">{order.address}</td>
                <td className="border border-gray-300 px-4 py-2">{Math.ceil(order.amount)}</td>
                <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                <td className="border border-gray-300 px-4 py-2">{order.userId.fullname}</td>
                <td className="border border-gray-300 px-4 py-2"><ul>
                {order.books.map((book,i)=>
                <li key={i}>{book.title}</li>
              )}
                  </ul></td>
                </tr>
              ))}
            
            
        
        </table>
      </div>

     </div>
      
      </div>   
    
    </div>
  )
}

export default AdminPage
