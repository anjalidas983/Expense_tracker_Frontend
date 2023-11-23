import './App.css';
import Login from './Pages/Login.js';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Signup from './Pages/Signup.js';
import Home from './Pages/Home'
import AddExpense from './Components/AddExpense/AddExpense';
import ExpenseHistory from './Components/ExpenseHistory/ExpenseHistory'
import ExpenseBarChart from './Components/YearlyExpenseBarChart/ExpenseBarChart.js'
import EditTransaction from './Components/EditTransaction/EditTransaction.js';
import { AuthProvider } from './AuthContext';
import PasswordResetForm from './Components/PasswordResetForm/PasswordResetForm.js';
import PasswordResetConfirm from './Components/PasswordResetConfirmForm/PasswordResetConfirm.js';

function App() {
 
  return (
    <div>
      <BrowserRouter>
     <AuthProvider>
      <Routes>
        <Route exact path='/' element={<Login/>}/> 
        <Route  path='/signup' element={<Signup/>}/>
        <Route  path='/home' element={<Home/>}/>
        <Route  path='/add-expense' element={<AddExpense/>}/>
        <Route  path='/expense-history' element={<ExpenseHistory/>}/>
        <Route  path='/yearly-expense' element={<ExpenseBarChart/>}/>
        <Route  path='/edit-transaction/:id' element={<EditTransaction/>}/>
        <Route path='/password-reset' element={<PasswordResetForm/>}/>
        <Route path='/confirm-reset-password/:uidb64/:token/' element={<PasswordResetConfirm/>}/>
        
      </Routes>
      </AuthProvider>
      </BrowserRouter>


    </div>
  );
}

export default App;
