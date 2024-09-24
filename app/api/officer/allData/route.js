import { connectToDatabase } from "@/app/lib/db";

export async function GET() {
    try {
        const conn = await connectToDatabase();

        const [results] = await conn.query(
            "SELECT * FROM dataService"
        );
        console.log("Results sent:", results);
        return new Response(
            JSON.stringify(results),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error("error", error);
        return new Response(JSON.stringify({ message: "login fail", error }), { status: 500 });
    }


}