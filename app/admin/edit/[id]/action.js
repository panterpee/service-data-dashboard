"use server";

import { cookies } from 'next/headers';

export async function getData(id) {
  const getToken = () => {
    const token = cookies().get('token');
    return token;
  };

  const token = getToken();
  if (!token) {
    return { message: "You have to login." };
  }

  try {
    const response = await fetch(
      `http://localhost:3000/api/officer/allDataService/selectEdit?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    console.log("data selected", data)
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { message: "Something went wrong", error: error.message };
  }
}
