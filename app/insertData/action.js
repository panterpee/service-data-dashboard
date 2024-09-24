"use server";
import axios from "axios";

export async function insertData(prevState,formData) {
  const getData = {
    officerName: formData.get("officerName"),
    product: formData.get("product"),
    part: formData.get("part"),
    malfunction: formData.get("malfunction"),
    custumerPhone: formData.get("custumerPhone"),
  };
  console.log(getData);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/officer/insertdata",
      getData
    );
    return (
        console.log("DataAdded",getData),
        console.log(response.data.message),
        {message: response.data.message}
        
    )
      
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : "Error Occured"
    );
  }
}
