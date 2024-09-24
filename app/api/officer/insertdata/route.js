// app/api/officer/route.js

import { connectToDatabase } from "@/app/lib/db";

export async function POST(req) {
    try {
        const conn = await connectToDatabase();
        const DataRecieve = await req.json();

        const [results] = await conn.query(
            "INSERT INTO dataService SET ?",
             DataRecieve
          );
         
        return new Response (
            JSON.stringify(
                {
                    message: "insert data success",
                    results
                },
            )
        )
    } catch (error) {
        console.error("error", error);
        return new Response(JSON.stringify({ message: "insert data failed", error }));
    }
}
