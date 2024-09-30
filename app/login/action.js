"use server";

import axios from 'axios';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const secret = "serviceSecretData"; 

export async function Login(prevState, formData) {
  const username = formData.get('username');
  const password = formData.get('password');

  try {
    const response = await axios.post(
      'http://localhost:3000/api/officer',
      { username, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    console.log(response.data.officerRole)
    if (response.data.message === "login success") {
      const token = jwt.sign({ username, role: response.data.officerRole }, secret, {
        expiresIn: "1h",
      });
      // localStorage.setItem('token', 'your-jwt-token');

      const cookieStore = cookies();
      cookieStore.set('token', token, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 3600,
      });
    }
    // console.log(response.data)
    console.log('Server Response:', response.data.message);
    console.log('Response Headers:', response.headers);

    return {
      message: response.data.message,
      officerName: response.data.officerName,
    };

  } catch (error) {
    console.error('Error:', error.response ? error.response.data : 'Error Occured');
    return {
      message: error.response ? error.response.data.message : 'Something Wrong',
    };
  }
}
