import { connectToDatabase } from "@/app/lib/db";

export async function GET() {
    try {
        const conn = await connectToDatabase();

        const [results] = await conn.query(`
            SELECT 
                dataService.sn,
                dataService.date AS service_date,
                installData.date AS install_date,
                installData.location,
                TIMESTAMPDIFF(MINUTE, installData.date, dataService.date) AS min_diff,
                dataService.product,
                dataService.officerName,
                dataService.part,
                dataService.malfunction
            FROM 
                dataService
            JOIN 
                installData 
            ON 
                dataService.sn = installData.sn;
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
