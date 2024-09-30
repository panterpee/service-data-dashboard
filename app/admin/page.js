'use client';

import {jwtDecode} from 'jwt-decode'; 
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function getCookie(name) {
  const value = document.cookie;
  const parts = value.split(`${name}=`);
  console.log(parts)
  return parts.pop();
}

export default function AdminPage() {
  const [userRole, setUserRole] = useState(null); 
  const router = useRouter();

  useEffect(() => {
    // Get token from cookie
    const token = getCookie('token'); 
    console.log(document.cookie);
    console.log(token)
    if (token) {
      try {
        const decodedToken = jwtDecode(token); 
        setUserRole(decodedToken.role); 

        //check role
        if (decodedToken.role !== 'admin') {
          alert("You can't access admin.");
          router.push(`/custumerData`); 
        }
      } catch (error) {
        console.error("Failed:", error);
        router.push(`/login`);
      }
    } else {
      alert("You have to login.");
      router.push(`/login`); 
    }
  }, [router]);

  console.log("role", userRole); 

  return <h1>Hello Admin</h1>;
}
