"use client";

import { useEffect, useState } from "react";
import { getData } from "./action";
import "./page.css";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [custumerData, setCustumerData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
  
      if (result.message) {
        alert(result.message); 
        window.location.href = "/login"; 
      } else {
        setCustumerData(result);
        console.log(result)
      }
    }
    fetchData();
  }, []);


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = custumerData.filter((data) =>
    data.officerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.part.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.malfunction.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.install_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.service_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.SN.toString().includes(searchTerm)
  );

  return (
    <div>
      <div className="input-container">
        <label htmlFor="search">Search: </label>
        <input
          name="search"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="center">
        <div className="table-height">
          <table>
            <thead>
              <tr>
                <th>Num</th>
                <th>Officer Name</th>
                <th>Product</th>
                <th>Part Defect</th>
                <th>Malfunction</th>
                <th>InstallDate</th>
                <th>ServiceDate</th>
                <th>Period (min.)</th>
                <th>Location</th>
                <th>SN.</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>{data.officerName}</td>
                  <td>{data.product}</td>
                  <td>{data.part}</td>
                  <td style={{ maxWidth: "400px" }}>{data.malfunction}</td>
                  <td style={{ maxWidth: "150px" }}>{data.install_date}</td>
                  <td style={{ maxWidth: "150px" }}>{data.service_date}</td>
                  <td>{data.total_days} d. {data.total_hours} hr. {data.total_minutes} m. </td>
                  <td>{data.location}</td>
                  <td>{data.SN}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
