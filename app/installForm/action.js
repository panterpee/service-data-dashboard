"use server";
import axios from "axios";
import { cookies } from 'next/headers';

export async function insertInstallData(prevState,formData) {

  const getToken = () => {
    const token = cookies().get('token');
    return token;
  };

  const token = getToken()
  if (!token) {
    alert("You have to login.")
    window.location.href = "/login";
  }

  // get data form and insert db
  const getData = {
    officerName: formData.get("officerName"), //get key
    product: formData.get("product"),
    sn: formData.get("modelSn"),
    location: formData.get("location"),
  };
  console.log(getData);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/officer/insertInstallData",
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

