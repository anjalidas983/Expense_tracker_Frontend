import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import './AddExpense.css'
import { useNavigate } from 'react-router-dom';


function AddExpense() {
  const {accessToken}=useAuth()
  const navigate =useNavigate()
  const [formData, setFormData] = useState({
    expense_name: '',
    amount: '',
    date: '',
    expense_category: '',
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const  [error,setError] =useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accessToken){
      console.error('token not found')
      
      return

    }
    console.log('Token in AddExpense:', accessToken);

    const config = {
      headers:{
        Authorization:`Bearer ${accessToken}`
      }
    }

    const shouldAddExpense = window.confirm('Are you sure you want to add this expense?');
    
    if (shouldAddExpense){
    // Send a POST request to your API to add the expense
    axios.post('http://127.0.0.1:8000/add-expense', formData,config)
      .then((response) => {
        console.log('Expense added:', response.data);
        navigate('/home')
        // Reset the form or perform other actions as needed
      })
      .catch((error) => {
        console.error('Error adding expense:', error);
        if(error.response){
          if(error.response.status===400){
            setError('Invalid data.Check date and amount you are adding.')
            
          }else{
            setError('Invalid data. Please try again')
          }

        }
        
        // Handle errors or show an error message to the user
      });
  }};

  useEffect(() => {
    // Fetch expense categories from your API
    axios.get('http://127.0.0.1:8000/category-list')
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <div>
      <div className='container-style'>
        <div className='rightComponent'>
      <h2 style={{textAlign:'center'}}>Add Expense</h2>
      <form onSubmit={handleSubmit} className='form-container'>
        {error?<div style={{textAlign:'center',fontWeight:'bold',color:'red'}}>{error}</div>:null}
      <div>
          <label htmlFor="expanse_name">Expense Name</label>
          <input
            type="text"
            id="expense_name"
            name="expense_name"
            value={formData.expense_name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
           
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
           
          </div>
          <div>
          <label htmlFor="expense_category">Category</label>
          {loading ? (
            <p>Loading categories...</p>
          ) : (
            <select
              id="expense_category"
              name="expense_category"
              
              value={formData.expense_category}
              onChange={handleInputChange}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_type}
                </option>
              ))}
            </select>
          )}
        </div>
        <button type="submit">Add Expense</button>
      </form>
      </div>
      </div>
      </div>
   
  );
}

export default AddExpense;
