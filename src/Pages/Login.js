import React from 'react'
import Login from '../Components/Login/Login';
import extr from '../Assets/extr.jpg'
import './Login.css'
import NavBar from '../Components/NavBar/NavBar'

function LoginPage() {
  return (
    <div>
      <NavBar/>
      <div className='loginpage-container'>
        <div className='text-container'>
        <h3 style={{fontFamily:'fantasy'}}>Your financial journey, made simpler<br></br> with Expense Tracker.</h3>
        {/* <p style={{fontWeight:'bold'}} >Track all your expenses here..</p> */}
        </div>
      <div className='image-container'>
        <img src={extr} alt='expensetrackerimage' className='background-image'/>
        </div>
        <div className='login-form'>
        <Login/>
        </div>
    </div>
    </div> 
  )
}

export default LoginPage;