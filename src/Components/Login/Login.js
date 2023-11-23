import React, { useState } from 'react'
import './Login.css'
import { Link,useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext'
import axios from 'axios'

function Login() {
  const [loginData,setLoginData]=useState({
    email:'',
    password:''
  })
  const { login } = useAuth();
  const [error,setError]=useState(null)
  
  const navigate = useNavigate()

  const handleLogin = async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', loginData);
      const accessToken = response.data.access;
  
      if (!accessToken) {
        console.error('Token not found in the response');
       
      }

      setError(null)
      setLoginData({email:'',password:''})
      // localStorage.setItem('token', accessToken);
      login(accessToken)

      // Now you can use the token or store it in state, depending on your needs
      // console.log(accessToken);
  
      navigate('/home');
    } catch (error) {

      if (error.response) {
        // Handle errors from the API response
        if (error.response.status === 401) {
          // The request is bad (e.g., incorrect email or password)
          setError('Invalid email or password. Please try again.');
          
        } else {
          // Other API errors
          setError('An error occurred while logging in. Please try again later.');
        }
        setLoginData({email:'',password:''})
     
    }
         console.error('Error fetching data', error);
  }
}


  return (
    <div>
      
<form onSubmit={handleLogin}>
  <h4 style={{color:'black'}}>Login to track your expense</h4>

{error ? <div className='error-message'>{error}</div>:null}
    <input 
    type='email' 
    name='email' 
    value={loginData.email}
    onChange={(e)=>setLoginData({...loginData,email:e.target.value})}
    placeholder='Email'/>
    <input 
    type='password'
     name='password'
     value={loginData.password}
     onChange={(e)=>setLoginData({...loginData,password:e.target.value})}
    placeholder='Password'/>
    <button style={{width:'100%'}} type='submit'>Login</button>
    <Link to='/password-reset' className='resetLink'>Forgot Paasword?</Link>
    <p style={{fontWeight:'bold',textAlign:'center',marginTop:'5px'}}>Don't have an account? <Link to='/signup' className='link'>Sign up</Link></p>
    
</form>




    </div>
  )
}

export default Login