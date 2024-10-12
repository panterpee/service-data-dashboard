// app/api/officer/route.js

import { connectToDatabase } from "@/app/lib/db";

export async function POST(req) {
    try {
        const conn = await connectToDatabase();
        const DataRecieve = await req.json();
        const snId = DataRecieve.SN;

        // Check exist SN 
        const [checkSN] = await conn.query(
            "SELECT * FROM modelSerial WHERE SN = ?",
            [snId]
        );
        if (checkSN.length === 0) {
            return new Response(
                JSON.stringify({
                    message: `SN ${snId} does not exist`,
                }),
                { status: 400 }
            );
        }        


        //SN is exist
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
