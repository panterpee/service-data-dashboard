"use server";

import axios from "axios";
import { cookies } from 'next/headers';

export async function getData() {
  const getToken = () => {
    const token = cookies().get('token');
    return token;
  };

  const token = getToken()
  if (!token) {
    return { message: "You have to login." };
  }

  try {
    const response = await axios.get(
      "http://localhost:3000/api/officer/get_install"
    );
    // console.log("Response :", response);
    // console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : "Error Occured"
    );
    return { message: error.response ? error.response.data.message : "Something Wrong"}
      
  }
}
