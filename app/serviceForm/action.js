"use server";
import axios from "axios";
import { cookies } from 'next/headers';

export async function insertData(prevState,formData) {

  const getToken = () => {
    const token = cookies().get('token');
    return token;
  };

  const token = getToken()
  if (!token) {
    alert("You have to login.")
    window.location.href = "/login";
  }

  const getData = {
    officerName: formData.get("officerName"),
    product: formData.get("product"),
    part: formData.get("part"),
    malfunction: formData.get("malfunction"),
    sn: formData.get("modelSn"),
  };
  console.log(getData);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/officer/insertdata",
      getData
    );
    return (
        console.log("DataAdded",getData),
        console.log(response.data),
        {message: response.data.message}
        
    )
      
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : "Error Occured"
    );
  }
}

export async function getModel() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/officer/allDataService/allModel"
    );
    // console.log("Response :", response);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : "Error Occured"
    );
    return { message: error.response ? error.response.data.message : "Something Wrong"}
      
  }
}


export async function getPart() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/officer/allDataService/allPart"
    );
    // console.log("Response :", response);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : "Error Occured"
    );
    return { message: error.response ? error.response.data.message : "Something Wrong"}
      
  }
}

