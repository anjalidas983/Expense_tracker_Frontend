import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import './RecentTransactions.css'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

function RecentTransactions() {
    const navigate=useNavigate()
    const {accessToken}=useAuth()
    const [data,setData]=useState([])
    useEffect(()=>{
      if (!accessToken){
       
        console.error('no token found')

      }

      const config ={
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      }
      axios.get('http://127.0.0.1:8000/recent-transactions',config)
      .then((response)=>setData(response.data))
      .catch((error)=>console.error('Error Fetching Data',error))

    },[accessToken])
     
    const handleDelete=(transactionId)=>{
      console.log('Transaction ID:', transactionId);
        
        const shouldDelete = window.confirm('Are you sure you want to delete this transaction?');
        if (shouldDelete) {
          const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          };

        axios.delete(`http://127.0.0.1:8000/expense-detail/${transactionId}/`,config)
        .then((response)=>{
            console.log(`Deleted transaction with ID: ${transactionId}`);
            setData(data.filter((transaction) => transaction.id !== transactionId));
        })
        .catch((error) => {
            console.error(`Error deleting transaction with ID: ${transactionId}`, error);
           
          });

    }

    }

    const handleEdit=(transactionId)=>{
        navigate(`/edit-transaction/${transactionId}`)

    }
    



  return (
    <div>
      <h2 className='text-style'>Recent Transactions</h2> 
    <div className="transaction-grid">
        
      {data.map((transaction) => (
        <div  className="transaction-item">
          
          <div className='expense-grid'>Expense : {transaction.expense_name}</div>
          <div className='expense-grid'>Amount: Rs {transaction.amount}</div>
          <div className='expense-grid'>Date: {transaction.date}</div>
          <div className='button-container'>
          <button className='editBlock'   onClick={()=>handleDelete(transaction.id)}><FaTrash  title='Delete' className='iconStyle' /> </button>
          <button className='editBlock' onClick={()=>handleEdit(transaction.id)}><FaEdit title='Edit'   className='iconStyle'/></button>
          </div>
        </div>
      ))}
    </div>
        
    </div>
  )
}

export default RecentTransactions