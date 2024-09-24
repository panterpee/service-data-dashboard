"use client";  

import { useEffect, useState } from 'react';
import { getData } from './action'; 
import './page.css'

export default function Page() {
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
  }, []);  // 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
        <table>
          <tr>
            <th>Num</th>
            <th>Officer Name</th>
            <th>Product</th>
            <th>Part Defect</th>
            <th>Malfunction</th>
            <th>Date</th>
          </tr>
        <tbody>
          {custumerData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td>{data.officerName}</td>
              <td>{data.product}</td>
              <td>{data.part}</td>
              <td>{data.malfunction}</td>
              <td>{data.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
