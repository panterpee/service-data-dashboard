import { connectToDatabase } from "@/app/lib/db";

export async function GET() {
    try {
        const conn = await connectToDatabase();

        const [results] = await conn.query(`
            SELECT * FROM installData
        `);

        console.log("Results sent:", results);
        return new Response(
            JSON.stringify(results),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error("Error:", error);
        return new Response(JSON.stringify({ message: "Error fetching data", error }), { status: 500 });
    }
}
