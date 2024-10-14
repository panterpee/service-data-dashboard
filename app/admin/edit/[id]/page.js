"use client"; // Mark this component as a client component

import { useEffect, useState } from "react";
import { getData } from "./action";

export default function Page({ params }) {
  const { id } = params;
  const [custumerData, setCustumerData] = useState(null); // Store customer data
  const [formData, setFormData] = useState({
    officerName: "",
    product: "",
    part: "",
    malfunction: "",
    SN: "",
    date: ""
  });
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getData(id); // Pass the ID to fetch the data

        if (result.message) {
          alert(result.message); 
          window.location.href = "/login"; 
        } else {
          setCustumerData(result[0]); // Assuming we get an array with one item
          setFormData({
            officerName: result[0]?.officerName || "",
            product: result[0]?.product || "",
            part: result[0]?.part || "",
            malfunction: result[0]?.malfunction || "",
            SN: result[0]?.SN || "",
            date: result[0]?.date || ""
          });
          console.log("Data fetched successfully:", result[0]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Something went wrong while fetching the data.");
        alert("Something went wrong: " + err.message);
      }
    }
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send updated data to the server for processing
    console.log("Updated data to be submitted:", formData);
    // You would call an update API here, e.g., axios.post('/api/update', formData)
  };

  if (error) {
    return <p>{error}</p>; 
  }

  return (
    <div>
      <h1>Edit Page</h1>
      <p>FORM ID: {id}</p>

      {custumerData ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Officer Name:</label>
            <input
              type="text"
              name="officerName"
              value={formData.officerName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Product:</label>
            <input
              type="text"
              name="product"
              value={formData.product}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Part:</label>
            <input
              type="text"
              name="part"
              value={formData.part}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Malfunction:</label>
            <input
              type="text"
              name="malfunction"
              value={formData.malfunction}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Serial Number (SN):</label>
            <input
              type="text"
              name="SN"
              value={formData.SN}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date.split("T")[0]} // Format date for input[type="date"]
              onChange={handleChange}
            />
          </div>

          <button type="submit">Update Data</button>
        </form>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}
