
import { connectToDatabase } from "@/app/lib/db";

export async function POST(req) {
    try {
        const officerData = await req.json();
        const conn = await connectToDatabase();
        const [results] = await conn.query(
            "INSERT INTO officer SET ?",
             officerData
        );
        console.log("Results sent:", results);
        return new Response(
            JSON.stringify({
                message: "Insert OK",
                results: results
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" }
            }
        );

    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({
                message: "Insert Error",
                error: error.message
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}