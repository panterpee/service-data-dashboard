import { connectToDatabase } from "@/app/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers'

const secret = "serviceSecretData";

export async function POST(req) {
  try {
    const conn = await connectToDatabase();
    const { username, password } = await req.json();
    const [results] = await conn.query(
      "SELECT * FROM officer WHERE username = ?",
      [username]
    );
    if (results.length === 0) {
      return new Response(JSON.stringify({ message: "Not found username" }), {
        status: 404,
      });
    }

    const officerData = results[0];
    console.log(typeof(officerData.password))
    console.log(typeof(password))
    if (officerData.password === password) {

      return new Response(JSON.stringify({ 
        message: "login success", 
        cookieSet: true,
        username 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      return new Response(JSON.stringify({ message: "wrong password" }), {
        status: 401,
      });
    }
  } catch (error) {
    console.error("error", error);
    return new Response(JSON.stringify({ message: "login fail", error }), {
      status: 500,
    });
  }
}
