import React from 'react'
import Signup from '../Components/Signup/Signup';
import NavBar from '../Components/NavBar/NavBar';
import extr from '../Assets/extr.jpg'
import './Signup.css'

function SignupPage() {
  return (
    <div >
    <NavBar/>
    <div className='signuppage-container'>
        <div className='text-container'>
        <h3 style={{fontFamily:'fantasy'}}>Your financial journey, made simpler<br></br> with Expense Tracker.</h3>
        {/* <p style={{fontWeight:'bold'}} >Register to track all your expenses here..</p> */}
        </div>
        <div className='image-container'>
        <img src={extr} alt='expensetrackerimage' className='background-image'/>
        </div>

        <div className='signup-form'>
        <Signup/>
        </div>

   


    </div>
    </div>
  )
}

export default SignupPage;