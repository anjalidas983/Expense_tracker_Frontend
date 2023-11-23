import React from 'react'
import DashBoard from '../Components/DashBoard/DashBoard';

import RecentTransactions from '../Components/RecentTransactions/RecentTransactions';
import './Home.css'
import PieChart from '../Components/MonthlyExpenseGraph/MonthlyExpenseGraph';



function HomePage() {

 


  return (
    <div className='home'>
        <div className='content-container'>
        <div className='block left-block'>
        <DashBoard/>

        </div>
        <div className='block center-block'>
        <PieChart />
        <div style={{marginTop:'7px'}}>
      
        </div>
        
        </div>
        <div className='block right-block'>
        <RecentTransactions/>
        </div>
        
        
       
        </div>
      
        </div>


    
  )
}

export default HomePage;