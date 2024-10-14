"use server";
import axios from "axios";
export async function insertData(prevState,formData) {
  const getData = {
    officerName: formData.get("officerName"),
    product: formData.get("product"),
    part: formData.get("part"),
    malfunction: formData.get("malfunction"),
    // location: formData.get("location"),
    SN: formData.get("modelSn"),
  };
  console.log(getData);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/officer/insertServiceData",
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
    return { message: error.response ? error.response.data.message : "Something Wrong"}
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
    console.error("Error:",error.response ? error.response.data : "Error Occured");
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

