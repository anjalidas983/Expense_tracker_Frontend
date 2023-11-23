import React,{useState,useEffect} from 'react'
import axios from 'axios'
import './ExpenseHistory.css'
import { useAuth } from '../../AuthContext'
import Header from '../Header/Header'
import { FaEdit, FaTrash } from 'react-icons/fa';
import DashBoard from '../DashBoard/DashBoard'
import { useNavigate } from 'react-router-dom'



function ExpenseHistory() {
    const {accessToken}=useAuth()
    const navigate =useNavigate()
    const [expenseData,setExpenseData]=useState([])
    const [error,setError] = useState(null)
    const [loading,setLoading]=useState(true)
    const [page,setPage]=useState(1)
    const [totalPages,setTotalPages] =useState(1)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
  



     useEffect(()=>{
        if (!accessToken){
          console.error('no token found');
          return;
        }
        const config = {
          headers :{
            Authorization:`Bearer ${accessToken}`
          }
        }

        const filters = {
          start_date: startDate,
          end_date: endDate,
          category: selectedCategory,
        };
        axios.get(`http://127.0.0.1:8000/expense-history/?page=${page}`,{
          ...config,
          params: { ...filters }
      })
        .then((response)=>{
          console.log('Response:', response);
          setExpenseData(response.data.results);
          setTotalPages(Math.ceil(response.data.count/12));
          setLoading(false);
        })
        .catch((error)=>{
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
     })

    },[accessToken,page,startDate, endDate, selectedCategory])

    const handlePageChange = (newPage) => {
      setPage(newPage);
    };
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
  const handleEdit=(id)=>{

       navigate(`/edit-transaction/${id}`)
  }
  const handleDelete=(id)=>{
    const shouldDelete = window.confirm('Are you sure you want to delete this transaction?')
    if (shouldDelete){
      const config = {
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      }
      axios.delete(`http://127.0.0.1:8000/expense-detail/${id}/`,config)
      .then((response)=>{
        console.log(`Deleted transaction with ID: ${id}`)
        setExpenseData(expenseData.filter((transaction)=>transaction.id !== id))
      }
      )
      .catch((error)=>{
        console.error(`Error deleting transaction with ID: ${id}`, error)
      })
    }

  }







  return (
    <div >
      <Header/>
      <div className='historyPage'>
      <div className='leftDashboard'>
        <DashBoard/>
      </div>
      <div className='rightHistory'>
      <div className='filterContainer'>
           <div className='filterItem'>
              <label >Start Date</label>
              <input
               
                type='date'
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className='filterItem'>
              <label >End Date</label>
              <input
               
                type='date'
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className='filterItem'>
              <label >Category</label>
              <select
               
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option >Select Category</option>
                <option value='Food'>Food</option>
                <option value='Shopping'>Shopping</option>
                <option value='Entertainment'>Entertainment</option>
                <option value='Medical Expense'>Medical Expense</option>
                <option value='Transportation'>Transportation</option>
              </select>
            </div>
        </div>


         <div className='containerPage'> 
        <div className='grid-container'>
        {expenseData.map((expense)=>(
            <div className='expense-card' key={expense.id}>
                <p>Expense:{expense.expense_name}</p>
                <p>Amount:Rs {expense.amount}</p>
                <p>Date:{expense.date}</p>
                <div className='icon-style'>
                <button className='buttonStyle' onClick={()=>handleDelete(expense.id)}><FaTrash title='Delete' /></button>
                <button className='buttonStyle' onClick={()=>handleEdit(expense.id)}><FaEdit  title='Edit'/></button>
                </div>
            </div>
        
        ))}

</div>
</div>
<div className='paginationBlock'>

          <button className='buttonContainer' onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Previous Page
          </button>
          <span> Page {page} of {totalPages} </span>
          <button className='buttonContainer' onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
            Next Page
          </button>
        </div>
      
        
      </div>
      </div>
      </div>
    
  )
}

export default ExpenseHistory