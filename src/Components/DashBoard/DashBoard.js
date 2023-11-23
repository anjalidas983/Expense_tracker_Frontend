import React, { useEffect, useState } from 'react'
import contact from '../../Assets/contact.png'
import './DashBoard.css'
import { RiAddLine } from 'react-icons/ri';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { FiLogOut } from 'react-icons/fi';


function DashBoard() {
   const [email,setEmail]=useState('')
   const {accessToken,logout} = useAuth()
   const navigate = useNavigate()

   useEffect(()=>{
       if (!accessToken){
        console.log('no token found')
        
       }
       const config ={
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      }
       
       axios.get('http://127.0.0.1:8000/get-user-email',config)
       .then((response)=>setEmail(response.data))
       .catch((error)=>console.error('error fetching data'))
   })





  return (
    <div className='dashboard-container'>
        <div className='image-container'>
        <img src={contact} alt='contactImage' className='contact-image'/>
        </div>
        <p style={{fontWeight:'bold',marginBottom:'15px'}}>{email.email}</p>
        <div style={{textAlign:'center',paddingBottom:'10px'}}>
        <Link to='/home' className='dashboard'>DashBoard</Link><br></br>
        <Link to='/expense-history' className='expenseHistory-link'>Expense History</Link><br></br>
        <Link to='/yearly-expense' className='reportPage-link'>Report Page</Link>
        </div>
        <div className='addexpense-container'>
        <Link to='/add-expense' className='addexpense-link'><RiAddLine/> Add Expense </Link> 
        </div>
        <button style={{backgroundColor:'white',color:'black',fontWeight:'bolder'}} onClick={()=>{
          logout()
          navigate('/')


          }}><FiLogOut/> Logout</button>
       
        
    </div>
  )
}

export default DashBoard;