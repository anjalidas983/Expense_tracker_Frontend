import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import './ExpenseBarChart.css'
import html2canvas from 'html2canvas';
import DashBoard from '../DashBoard/DashBoard';
import { FiDownload } from 'react-icons/fi';


const ExpenseBarChart = () => {
  const { accessToken } = useAuth();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (!accessToken) {
      console.error('No token found');
    }

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    // Fetch data from your API using Axios
    axios
      .get(`http://127.0.0.1:8000/monthly-expense-category-yearly/${selectedYear}/`, config)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [accessToken,selectedYear]);

  useEffect(() => {
    if (Object.keys(data).length > 0 && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy the old chart if it exists
      }

      const months = Object.keys(data);
    //   const categories = Object.keys(data[months[0]]); // Assuming all months have the same categories
      const categories = Array.from(
        new Set(
          months.flatMap((month) =>
            Object.keys(data[month]).length > 0
              ? Object.keys(data[month])
              : []
          )
        )
      );


      const chartData = {
        labels: months,
        datasets: categories.map((category) => ({
          label: category,
          data:  months.map((month) => data[month][category] || 0),
          backgroundColor:getRandomColor(),
          borderWidth: 1,
        })),
      };

      const context = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(context, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            x: { // X-axis scaling options
              stacked: true,
            },
            y: { // Y-axis scaling options
              stacked: true,
            },
          },
        },
      });
    }
  }, [data]);

  const handleYearChange = (event) => {
    const newYear = event.target.value;
    setSelectedYear(newYear);
  };

  const handleDownload = async () => {
    const chartCanvas = chartRef.current;
    const chartImage = await html2canvas(chartCanvas);

    // Create an anchor element
    const link = document.createElement('a');
    const imgData = chartImage.toDataURL('image/png');
    link.href = imgData;
     link.download = 'expense_chart.png';
     link.click();
   };

  


  if (loading) {
    return <p style={{textAlign:'center',fontWeight:'bolder'}}>Loading...</p>;
  }

  if (error) {
    return <p style={{textAlign:'center',fontWeight:'bolder'}}>Error: {error.message}</p>;
  }

  return (
   
    <div >
   
    <div class='reportPage'>
      <div className='leftBlock'>
        <DashBoard/>
      </div>
      <div className='rightBlock'>
    <div style={{textAlign:'center'}}>
      <div style={{display: 'flex',alignItems:'center',marginLeft:'24%'}}>
      <h2 style={{textAlign:'center'}}>Monthly Expenses Report- {selectedYear}</h2>
      <button onClick={handleDownload} style={{ marginLeft: '220px' }}>
          <FiDownload/>  Download
        </button>
      </div>
      <label htmlFor="yearInput">Select Year: </label>
      <input
        type="number"
        id="yearInput"
        value={selectedYear}
        onChange={handleYearChange}
        min={2000} // Set a minimum year as per your requirement
        max={new Date().getFullYear()} // Set a maximum year as per your requirement
      />
      </div> 
     
      <div className='page-container'>
      <div className='rightContainer'>
      
      <div className="chart-container">
      <p style={{fontSize:'20px',fontWeight:'bolder',marginRight:'35%',marginBottom:'10px'}}>Bar chart showing monthly<br></br>expense by Category</p>
      <canvas ref={chartRef} className="chart-canvas" ></canvas>
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
     
      
    
  );
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default ExpenseBarChart;
