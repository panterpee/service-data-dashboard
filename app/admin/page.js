"use client";

import { useEffect, useState } from "react";
import { getData } from "./action";
import "./page.css";
import { jwtDecode } from 'jwt-decode'; 
import { useRouter } from 'next/navigation';
import { useUserContext } from "../userContext";

export default function Page() {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [custumerData, setCustumerData] = useState([]);
  
  function getCookie() {
    const token_store = document.cookie;
    const token = token_store.split(`token=`).pop();
    return token;
  }
  
  useEffect(() => {
    async function fetchData() {
      const result = await getData();
  
      if (result.message) {
        alert(result.message); 
        window.location.href = "/login"; 
      } else {
        setCustumerData(result);
      }
    }
    fetchData();
  }, []);

  const { userRole, setUserRole } = useUserContext(); 
  const router = useRouter();

  useEffect(() => {
    const token = getCookie();
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserRole(decodedToken.role); 
        console.log("Decoded role:", decodedToken.role);
      } catch (error) {
        console.error("Failed to decode token:", error);
        router.push(`/login`);
      }
    } else {
      alert("You have to login.");
      router.push(`/login`);
    }
  }, [setUserRole, router]);

  useEffect(() => {
    if (userRole) {
      console.log("userRole", userRole);

      // Check role
      if (userRole !== 'admin') {
        alert("You can't access admin.");
        router.push(`/allDataService`);
      }
    }
  }, [userRole, router]);  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (id) => {
    // Navigate to edit page or handle editing logic here
    console.log("Editing entry with ID:", id);
    router.push(`admin/edit/${id}`);
    // For example, you could use the router to navigate to an edit page
    // router.push(`/edit/${id}`); // Make sure to set up a corresponding route
  };

  const filteredData = custumerData.filter((data) =>
    data.officerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.product?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.part?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.malfunction?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.install_date?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.service_date?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.SN?.toString().includes(searchTerm)
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
                <th>Install Date</th>
                <th>Service Date</th>
                <th>Period (min.)</th>
                <th>Location</th>
                <th>SN</th>
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
                  <td style={{color:"red"}}>
                    <button onClick={() => handleEditClick(data.id)}>Edit</button> {/* Send data.id */}
                  </td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
