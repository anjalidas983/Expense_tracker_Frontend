import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import { useAuth } from '../../AuthContext'
import './EditTransaction.css'


function EditTransaction() {
    const {accessToken}=useAuth()
    const navigate=useNavigate()
    const { id } = useParams();
    const [expenseCategories, setExpenseCategories] = useState([])
    const [formData,setFormData] = useState({
        expense_name:'',
        amount:'',
        expense_category:'',
        date:'',
    })
  useEffect(()=>{
    if (!accessToken){
        console.error('no token found')
      }

      const config ={
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      }
      axios.get('http://127.0.0.1:8000/category-list')
      .then((response) => {
        setExpenseCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching expense categories', error);
      });
 

    axios.get(`http://127.0.0.1:8000/expense-detail/${id}/`,config)
    .then((response)=>{
        const {expense_name,amount,expense_category,date}=response.data
        setFormData({expense_name,amount,expense_category:expense_category,date})
    })
    .catch((error)=>{
        console.error('Error in fetching data',error)
    })
  },[id,accessToken])
  useEffect(() => {
    // Update the form data when expenseCategories changes
    const categoryIndex = expenseCategories.findIndex(
      (category) => category.id === formData.expense_category
    );
    const categoryId = categoryIndex !== -1 ? expenseCategories[categoryIndex].id : '';
    setFormData((prevData) => ({ ...prevData, expense_category: categoryId }));
  }, [expenseCategories,formData.expense_category]);
   


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const shouldSave = window.confirm('Are you sure you want to save changes?');
    if(shouldSave){
    if (!accessToken){
        console.error('no token found')
      }

      const config ={
        headers:{
          Authorization:`Bearer ${accessToken}`
        }
      }
    axios.put(`http://127.0.0.1:8000/expense-detail/${id}/`,formData,config)
      .then(() => {
        navigate('/home');
      })
      .catch((error) => console.error('Error Updating Data', error));
  };
}

  return (
    <div>  
      <div className='editBlockContainer'>
        <div className='rightContainerBlock'>
     <h2>Edit Transaction</h2>
      <form onSubmit={handleEditSubmit}>
        <label htmlFor="expense_name">Expense Name:</label>
        <input
          type="text"
          id="expense_name"
          name="expense_name"
          value={formData.expense_name}
          onChange={handleChange}
        />
         <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <label htmlFor="expense_category">Expense Category:</label>
        <select
        id="expense_category"
        name="expense_category"
        value={formData.expense_category}
        onChange={handleChange}
       > 
     
          {expenseCategories.map(category => (
       <option key={category.id} value={category.id}>
      {category.category_type}
        </option>
       ))}
      </select>
         <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <button type="submit">Save Changes</button>
      </form>
      </div>

      </div>

    </div>
  )
}

export default EditTransaction