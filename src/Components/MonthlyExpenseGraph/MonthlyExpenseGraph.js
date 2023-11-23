import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart } from 'chart.js/auto';
import './MonthlyExpenseGraph.css'
import { useAuth } from '../../AuthContext';



const PieChart = () => {
  const {accessToken}=useAuth()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
 

  useEffect(() => {
    if (!accessToken){
      console.error('no token found')
      
    }
    const config = {
      headers:{
        Authorization:`Bearer ${accessToken}`
      }
    }
    // Fetch data from your API using Axios
    axios.get('http://127.0.0.1:8000/monthly-category-expense',config)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [accessToken]);

  useEffect(() => {
    if (data.length > 0 && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Destroy the old chart if it exists
      }

      // Prepare the data for the pie chart
      const chartData = {
        labels: data.map((item) => item.expense_category__category_type),
        datasets: [
          {
            data: data.map((item) => item.total_expense),
            backgroundColor: ['#ff6666','#00e600','#3385ff','#ffff1a','#ff66a3'], // Colors for the slices
          },
        ],
      };

      const context = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(context, {
        type: 'pie',
        data: chartData,
      });
    }
  }, [data]);

  if (loading) {
    return <p className='text-style'>Loading...</p>;
  }

  if (error) {
    return <p className='text-style'>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Expense Breakdown</h2>
      <canvas ref={chartRef} className='chart-canvas'></canvas>
    </div>
  );
};

export default PieChart;
