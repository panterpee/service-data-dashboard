"use server";

import axios from "axios";
import { cookies } from 'next/headers';

export async function getData() {
  const getToken = () => {
    const token = cookies().get('token');
    return token;
  };
  //check already login
  const token = getToken()
  if (!token) {
    return { message: "You have to login." };
  }

  try {
    const response = await axios.get(
      "http://localhost:3000/api/officer/allDataService"
    );
    // console.log("Response :", response);
    return response.data;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : "Error Occured"
    );
    return { message: error.response ? error.response.data.message : "Something Wrong"}
      
  }
}

// not creat api yet
export async function updateDataService(editedData) {
  try {
    // Use axios.put to send a PUT request with the edited data
    const response = await axios.put('http://localhost:3000/api/officer/allDataService/editData', editedData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('editData:', editedData);
    
    if (response.status === 200) {
      // Return the updated data from the server response
      return response.data;
    } else {
      throw new Error('Failed to save data');
    }
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
}