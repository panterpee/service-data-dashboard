import { connectToDatabase } from "@/app/lib/db";

export async function GET() {
    try {
        const conn = await connectToDatabase();

        const [results] = await conn.query(
            "SELECT * FROM part"
        );
        // console.log("Results recieve:", results);
        return new Response(
            JSON.stringify(results),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }
        );

    } catch (error) {
        console.error("error", error);
        return new Response(JSON.stringify({ message: "Part data failed", error }), { status: 500 });
    }


}