"use client";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'chart.js/auto';
import { getData } from "./action";
import './chart.css'

// Dynamically import the Bar component from react-chartjs-2
const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});

const BarChart = () => {
  const [custumerData, setCustumerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();

      if (result.message) {
        setError(result.message);
      } else {
        setCustumerData(result);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Group the data by model and count occurrences
  const modelCounts = custumerData.reduce((acc, item) => {
    if (acc[item.product]) {
      acc[item.product] += 1; // Increase count if the model already exists
    } else {
      acc[item.product] = 1; // Initialize the count for a new model
    }
    return acc;
  }, {});

  console.log('modelCount:' ,modelCounts)

  // Extract labels (unique models) and corresponding data (counts)
  const labels = Object.keys(modelCounts); // Unique model names
  const dataValues = Object.values(modelCounts); // Count of each model

  // Data for the chart
  const data = {
    labels: labels, // Dynamically generated labels from custumerData
    datasets: [
      {
        label: 'Product Defect Count',
        data: dataValues,  // Count of each model
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ maxWidth: '800px', height: 'max-content', color:"GrayText", textAlign:"center", 
    fontSize:"25px", fontWeight:"bolder", backgroundColor:"rgba(255, 255, 255, 0.5)"
    ,marginBottom:"5rem", marginLeft:"5vw"}}>
      <h1>Product Defect Chart</h1>
      <Bar data={data}/>
    </div>
  );
};

export default BarChart;
