import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import './Signup.css'
import axios from 'axios'



function Signup() {
  const [formData,setFormData]=useState({
    username:'',
    password:'',
    email:''
  })
  const [error,setError]=useState({})
  const [successMessage,setSuccessMessage]=useState('')
  const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]: e.target.value})

  }
 
  const handleSubmit= async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/user-registration', formData);
      console.log(response.data); 
      setSuccessMessage('Registered successfully.');
      
      setTimeout(() => {
        navigate('/'); 
      }, 2000); 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        
        setError(error.response.data.error); 
      } else {
        setError({ detail: 'Email is already in use.Try again' });  
      
      }
    }

  }

  return (
    <div>
       {successMessage && (
        <p style={{ color: 'blue',textAlign:'center',fontWeight:'bolder' }}>{successMessage}</p>
      )}
      {error && error.detail && (
  <p style={{ color: 'red',marginBottom:'5px' }}>{error.detail}</p>
    )}
        <form onSubmit={handleSubmit}>
          <h4 style={{color:'black'}}>Register to track your expense</h4>
            <input
             type='text' 
             name='username' 
             value={formData.username}
             onChange={handleChange}
             placeholder='Username'  />
               {error && error.username && (
          <p style={{ color: 'red',textAlign:'center',fontWeight:'bold' }}>{error.username}</p>
        )}
            <input 
            type='password'
             name='password'
             value={formData.password}
             onChange={handleChange}
             placeholder='Password'/>
              {error && error.password && (
          <p style={{ color: 'red',textAlign:'center',fontWeight:'bold' }}>{error.password}</p>
        )}
            <input
             type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Email'/>
               {error && error.email && (
          <p style={{ color: 'red',textAlign:'center',fontWeight:'bold' }}>{error.email}</p>
        )}
            <button style={{width:'100%'}} type='submit'>Sign up</button>
            <p style={{fontWeight:'bold',marginTop:'5px',textAlign:'center'}}>Already have an account? <Link to='/' className='link'>Login</Link></p>
            
        </form>
    </div>
  )
}

export default Signup