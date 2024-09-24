"use server";

import axios from "axios";

export async function getData() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/officer/allData"
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
