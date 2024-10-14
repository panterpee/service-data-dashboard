'use client';

import { jwtDecode } from 'jwt-decode'; 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getData } from './action';
import { useUserContext } from "../userContext";
import { checkToken } from '../lib/auth';
import "./page.css";

// Get token from cookie
// function getCookie() {
//   const token_store = document.cookie;
//   const token = token_store.split(`token=`).pop();
//   return token;
// }

export default function AdminPage() {
  const { userRole, setUserRole } = useUserContext(); 
  const router = useRouter();

  useEffect(() => {
    const token = checkToken();
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
        router.push(`/serviceForm`);
      }
    }
  }, [userRole, router]);  

  const [searchTerm, setSearchTerm] = useState(""); 
  const [installData, setInstallData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();

      if (result.message) {
        alert(result.message);
        window.location.href = "/login"; 
      } else {
        setInstallData(result);
      }
    }
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = installData.filter((data) =>
    data.officerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.SN.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.date.toLowerCase().includes(searchTerm.toLowerCase()) 
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
                <th>SN</th>
                <th>InstallDate</th>
                <th>Location</th>
                {/* <th>Date</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>{data.officerName}</td>
                  <td>{data.product}</td>
                  <td>{data.SN}</td>
                  <td style={{ maxWidth: "150px" }}>{data.date.split("T")[0]}</td>
                  <td>{data.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
