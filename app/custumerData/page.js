"use client";

import { useEffect, useState } from "react";
import { getData } from "./action";
import "./page.css";

export default function Page() {
  const [custumerData, setCustumerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtered data based on the search term
  const filteredData = custumerData.filter((data) =>
    data.officerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.part.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.malfunction.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.custumerPhone.toString().includes(searchTerm)
  );

  return (
    <div>
      <div className="input-container">
      <label for="search" >Search: </label>
        <input
          name = "search"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    <div/>
    <div className="center">
      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Num</th>
            <th>Officer Name</th>
            <th>Product</th>
            <th>Part Defect</th>
            <th>Malfunction</th>
            <th>Date</th>
            <th>Phone num.</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td>{data.officerName}</td>
              <td>{data.product}</td>
              <td>{data.part}</td>
              <td style={{maxWidth: "500px"}}>{data.malfunction}</td>
              <td>{data.date}</td>
              <td>{data.custumerPhone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
}
