import { jwtDecode } from 'jwt-decode'; 

export function getCookie(name) {
  const cookies = document.cookie.split('; ').find(row => row.startsWith(`${name}=`));
  return cookies ? cookies.split('=')[1] : null;
}

export function checkToken() {
  const token = getCookie("token");
  console.log("token", token);

  if (!token) {
    alert("You have to login.");
    window.location.href = "/login"; 
  }
  return token
}

export function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
